
import {
  NativeModules,
  PushNotificationIOS,
  AppState,
} from 'react-native';

import IdleTimerManager from 'react-native-idle-timer';

import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';

import SilentSwitch from 'react-native-silent-switch';

import {
  updateNotificationPermissions,
  updateSilentSwitchState,
  NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED,
  NOTIFICATION_PERMISSIONS_STATUS_DENIED,
  NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
} from '../actions/notifications';

import { soundAlarm, snoozeAlarm, stopAlarm } from '../actions/alarm';

import TimeWatcherActor from './timeWatcher';

export default class NotificationActor {
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;
    this.timeWatcherActor = null;
    this.silent = false;
    this.permissions = NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED;

    // Everytime app is opened, check if notifications are still on
    AppState.addEventListener('change', () => {
      this.checkStatus();
    });

    // Listen for silent switch toggle events
    SilentSwitch.addEventListener((silent) => {
      this.silent = silent;
      if (AppState.currentState === 'active') {
        if (silent) {
          IdleTimerManager.setIdleTimerDisabled(true);
        } else if (!silent && this.permissions !== NOTIFICATION_PERMISSIONS_STATUS_DENIED) {
          IdleTimerManager.setIdleTimerDisabled(false);
        }
        this.dispatch(updateSilentSwitchState(silent));
      }
    });

    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));

    this.snoozeAction = new NotificationAction({
      activationMode: 'background',
      title: 'Snooze',
      identifier: 'SNOOZE_ACTION',
    }, (action, completed) => {
      this.dispatch(snoozeAlarm(action.notification.getData().alarmUUID));
      completed();
    });

    this.stopAction = new NotificationAction({
      activationMode: 'background',
      title: 'Stop',
      identifier: 'STOP_ACTION',
    }, (action, completed) => {
      this.dispatch(stopAlarm(action.notification.getData().alarmUUID));
      completed();
    });

    this.alarmActions = new NotificationCategory({
      identifier: 'ALARM',
      actions: [this.snoozeAction, this.stopAction],
      context: 'default',
    });

    this.requestPermissions().then(() => {
      this.checkStatus().catch(() => {
        this.checkStatus();
      });
    });

    // consume actions
    NotificationsIOS.consumeBackgroundQueue();
    // consume notifications
    PushNotificationIOS.getInitialNotification(0).then((notification) => {
      if (notification !== null) {
        this.dispatch(snoozeAlarm(notification.getData().alarmUUID));
      }
    });
  }

  killActor() {
    AppState.removeEventListener('change');
    SilentSwitch.removeEventListener();

    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
    NotificationsIOS.resetCategories();

    if (this.TimeWatcherActor) {
      this.TimeWatcherActor.killActor(this.silent);
    }
  }

  onNotificationReceivedForeground(notification) {
    this.dispatch(soundAlarm(notification.getData().alarmUUID));
  }

  onNotificationReceivedBackground(notification) {
    this.dispatch(soundAlarm(notification.getData().alarmUUID));
  }

  onNotificationOpened(notification) {
    this.dispatch(soundAlarm(notification.getData().alarmUUID));
  }

  async checkStatus() {
    try {
      this.permissions = await NativeModules.CMSiOSNotificationPermissionsManager.checkPermissions();

      if (this.permissions !== NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED) {
        // If we cannot get push notification permissions then watch
        // the time to sound alarms
        if (this.TimeWatcherActor == null) {
          this.TimeWatcherActor = new TimeWatcherActor(this.store);
        }
      } else {
        if (this.TimeWatcherActor) {
          this.TimeWatcherActor.killActor(this.silent);
          this.TimeWatcherActor = null;
        }
      }

      this.dispatch(updateNotificationPermissions(this.permissions));
    } catch (e) {
      console.log(e);
    }
  }

  async requestPermissions() {
    try {
      NotificationsIOS.requestPermissions([this.alarmActions]);
      await NativeModules.CMSiOSNotificationPermissionsManager.requestPermissions();
    } catch (e) {
      console.log(e);
    }
  }
}
