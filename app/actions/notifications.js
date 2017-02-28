import { Platform } from 'react-native';
import NotificationsIOS from 'react-native-notifications';
import PushNotification from 'react-native-push-notification';

import moment from 'moment';

// *** Action Types ***
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const UPDATE_NOTIFICATION_PERMISSIONS = 'UPDATE_NOTIFICATION_PERMISSIONS';
export const UPDATE_SILENT_SWITCH_STATE = 'UPDATE_SILENT_SWITCH_STATE';

// *** Status Types ***
export const NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED = 'NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED';
export const NOTIFICATION_PERMISSIONS_STATUS_DENIED = 'NOTIFICATION_PERMISSIONS_STATUS_DENIED';
export const NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED = 'NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED';

const tweetyStrings = [
  'starts the chorus',
  'joins the chorus',
  'joins the chorus',
  'joins the chorus',
  'joins the chorus',
];

export function clearNotifications(alarm) {
  if (Platform.OS === 'ios') {
    NotificationsIOS.cancelLocalNotification(alarm.uuid.toString());
  } else if (Platform.OS === 'android') {
    PushNotification.cancelLocalNotifications({ alarmUUID: alarm.uuid });
    PushNotification.clearAllNotifications();
  }
  return (Object.assign({}, alarm, { notifications: [] }));
}

function createiOSNotification(bird, index, date, alarm) {
  NotificationsIOS.localNotification({
    alertTitle: 'Dawn Chorus Alarm',
    category: 'ALARM',
    alertBody: `The ${bird.name} ${tweetyStrings[index]}!`,
    alertAction: 'Tap to snooze alarm.',
    soundName: bird.sound.iosNotification,
    fireDate: date.toDate().toISOString(),
    userInfo: { alarmUUID: alarm.uuid },
  }, alarm.uuid.toString());

  return;
}

function createAndroidNotification(bird, index, date, alarm) {
  PushNotification.localNotificationSchedule({
    largeIcon: bird.images.face,
    smallIcon: 'ic_notification',
    title: 'Dawn Chorus Alarm',
    alarmUUID: alarm.uuid,
    userInfo: { alarmUUID: alarm.uuid },
    message: `The ${bird.name} ${tweetyStrings[index]}!`,
    subText: 'Tap to hear chorus',
    date: date.toDate(),
    soundName: bird.sound.androidNotification,
    vibrate: false,
    actions: '["Snooze", "Stop"]',
  });

  return;
}

export function scheduleAlarm(alarm) {
  // This function will be called when an alarm is saved, or turned on
  const date = moment();
  date.set('year', moment().year());
  date.set('month', moment().month());
  date.set('date', moment().date());
  date.set('hour', alarm.time.hour);
  date.set('minute', alarm.time.minute);
  date.set('second', 0);
  date.set('millisecond', 0);

  if (date.isAfter(moment()) === false) {
    date.add(1, 'days');
  }

  alarm.chorus.map((bird, index) => {
    if (bird !== null) {
      if (Platform.OS === 'ios') {
        createiOSNotification(bird, index, date, alarm);
      } else if (Platform.OS === 'android') {
        createAndroidNotification(bird, index, date, alarm);
      }
    }

    // Add 20 seconds to the next alarm to stagger alarms
    date.add(20, 'seconds');
    return bird;
  });

  return;
}

export function scheduleSnoozedAlarm(alarm) {
  const date = moment();
  const snoozeTime = moment();
  snoozeTime.add(10, 'minutes');
  snoozeTime.set('second', 0);
  snoozeTime.set('millisecond', 0);

  date.add(10, 'minutes');
  date.set('second', 0);
  date.set('millisecond', 0);

  alarm.chorus.map((bird, index) => {
    if (bird !== null) {
      if (Platform.OS === 'ios') {
        createiOSNotification(bird, index, date, alarm);
      } else if (Platform.OS === 'android') {
        createAndroidNotification(bird, index, date, alarm);
      }
    }

    // Add 20 seconds to the next alarm to stagger alarms
    date.add(20, 'seconds');
    return bird;
  });

  return {
    time: {
      actual: snoozeTime,
      hour: snoozeTime.hour(),
      minute: snoozeTime.minute(),
    },
  };
}

export function updateNotificationPermissions(update) {
  return {
    type: UPDATE_NOTIFICATION_PERMISSIONS,
    update,
  };
}

export function updateSilentSwitchState(silent) {
  return {
    type: UPDATE_SILENT_SWITCH_STATE,
    silent,
  };
}
