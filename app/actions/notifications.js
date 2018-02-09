import AndroidAlarms from 'react-native-android-alarms';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';


export function clearNotifications(alarm) {
  AndroidAlarms.clearAlarm(alarm.uuid);
}

export function clearOldNotifications(alarm) {
  PushNotification.cancelLocalNotifications({ alarmUUID: alarm.uuid });
  PushNotification.clearAllNotifications();
}


export function scheduleAlarm(alarm) {
  // If alarm does not repeat,
  // Set alarm to go off the next time that it reaches the set time
  if (!alarm.repeats) {
    const alarmTime = moment();
    alarmTime.set('year', moment().year());
    alarmTime.set('month', moment().month());
    alarmTime.set('date', moment().date());
    alarmTime.set('hour', alarm.time.hour);
    alarmTime.set('minute', alarm.time.minute);
    alarmTime.set('second', 0);
    alarmTime.set('millisecond', 0);
    // If this time already passed today, set alarm for tomorrow
    if (alarmTime.isAfter(moment()) === false) {
      alarmTime.add(1, 'days');
    }
    // Set the alarm and return the time 
    AndroidAlarms.setAlarm(alarm.uuid, alarmTime.valueOf(), false);
    return alarmTime;
  } else {
   // If alarm DOES repeat....
    let loops = 0;
    let alarmSet = false;
    const alarmTime = moment();
    alarmTime.set('year', moment().year());
    alarmTime.set('month', moment().month());
    alarmTime.set('date', moment().date());
    alarmTime.set('hour', alarm.time.hour);
    alarmTime.set('minute', alarm.time.minute);
    alarmTime.set('second', 0);
    alarmTime.set('millisecond', 0);
    // Go through each day until we hit one where alarm needs to be
    while (!alarmSet && loops <= 8) {
      let momentDay = alarmTime.day();
      let adjustedIndex = (momentDay + 6) % 7; // adjusted bc app stores week as [monday, tuesday, wednesday, thurs, fri, sat, sun]
      // If alarm time day is supposed to have an alarm, and the time hasn't passed:
      if (alarm.days[adjustedIndex] && alarmTime.isAfter(moment())) {
        // We should exit this loop and set the alarm
        alarmSet = true;
      } else {
        // check the next day!
        alarmTime.add(1, 'days');
        loops += 1;
      }
    }
    // Set the alarm and return the time 
    if (alarmSet) {
      AndroidAlarms.setAlarm(alarm.uuid, alarmTime.valueOf(), false);
      return alarmTime;
    } else {
      console.log("Error couldnt set repeated alarm");
      return null;
    }
  }  
}


export function scheduleSnoozedAlarm(alarm) {
  // Snooze Time is always 10 minutes from when 'snooze' was pressed
  const snoozeTime = moment();
  snoozeTime.add(10, 'minutes');
  snoozeTime.set('second', 0);
  snoozeTime.set('millisecond', 0);
  // Set the snoozed alarm
  AndroidAlarms.setAlarm(alarm.uuid, snoozeTime.valueOf(), false);
  // return the snooze time for display on alarm screen
  return {
    time: {
      actual: snoozeTime,
      hour: snoozeTime.hour(),
      minute: snoozeTime.minute(),
    },
  };
}