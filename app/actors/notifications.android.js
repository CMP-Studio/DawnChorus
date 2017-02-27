import {
  Component,
} from 'react';

import {
  NativeModules,
  AppState,
} from 'react-native';

import PushNotification from 'react-native-push-notification';

import {
  updateNotificationPermissions,
  NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED,
  NOTIFICATION_PERMISSIONS_STATUS_DENIED,
} from '../actions/notifications';

import { soundAlarm, snoozeAlarm, stopAlarm, cancelAllAlarms } from '../actions/alarm';

export default class NotificationActor extends Component {
  constructor(store) {
    super();
    this.dispatch = store.dispatch;

    AppState.addEventListener('change', () => {
      this.checkStatus();
    });

    PushNotification.configure({
      onRegister(token) {
      },

      onNotification(notification) {
        if (notification.action !== undefined) {
          if (notification.action === 'Stop') {
            store.dispatch(stopAlarm(notification.alarmUUID));
          } else if (notification.action === 'Snooze') {
            store.dispatch(snoozeAlarm(notification.alarmUUID));
          }
        } else {
          store.dispatch(soundAlarm(notification.alarmUUID));
        }
      },

      popInitialNotification: true,

      requestPermissions: true,
    });

    (() => {
      PushNotification.registerNotificationActions(['Snooze', 'Stop']);
    })();

    this.checkStatus();
  }

  async checkStatus() {
    try {
      const permissions = await NativeModules.NotificationsPermissions.checkPermissions();
      if (permissions === false) {
        this.dispatch(updateNotificationPermissions(NOTIFICATION_PERMISSIONS_STATUS_DENIED));
        this.dispatch(cancelAllAlarms());
      } else if (permissions === true) {
        this.dispatch(updateNotificationPermissions(NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED));
      }
    } catch (e) {
      console.log(e);
    }
  }
}
