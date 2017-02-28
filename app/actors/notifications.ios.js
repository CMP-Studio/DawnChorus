
import {
  NativeModules,
  PushNotificationIOS,
  AppState,
} from 'react-native';

import NotificationsIOS, { NotificationAction, NotificationCategory } from 'react-native-notifications';

import SilentSwitch from 'react-native-silent-switch';

import {
  updateNotificationPermissions,
  updateSilentSwitchState,
  NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED,
} from '../actions/notifications';

import { soundAlarm, snoozeAlarm, stopAlarm, cancelAllAlarms } from '../actions/alarm';

export default class NotificationActor {
  constructor(store) {
    this.dispatch = store.dispatch;

    // Everytime app is opened, check if notifications are still on
    AppState.addEventListener('change', () => {
      this.checkStatus();
    });

    // Listen for silent switch toggle events
    SilentSwitch.addEventListener((silent) => {
      if (AppState.currentState === 'active') {
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

  componentWillUnmount() {
    AppState.removeEventListener('change');
    SilentSwitch.removeEventListener();
    NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
    NotificationsIOS.resetCategories();
  }

  onNotificationReceivedForeground(notification) {
    this.dispatch(soundAlarm(notification.getData().alarmUUID));
  }

  onNotificationReceivedBackground(notification) {
    this.dispatch(soundAlarm(notification.getData().alarmUUID));
  }

  onNotificationOpened(notification) {
    this.dispatch(snoozeAlarm(notification.getData().alarmUUID));
  }

  async checkStatus() {
    try {
      const permissions = await NativeModules.CMSiOSNotificationPermissionsManager.checkPermissions();
      if (permissions !== NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED) {
        this.dispatch(cancelAllAlarms());
      }
      this.dispatch(updateNotificationPermissions(permissions));
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
