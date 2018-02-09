import { AsyncStorage } from 'react-native';
import moment from 'moment';
import SplashScreen from 'react-native-splash-screen'

import {
  scheduleAlarm,
  scheduleSnoozedAlarm,
  clearNotifications,
  clearOldNotifications,
} from './notifications.js';

import { getRandomBirds } from '../utilities.js';

import birds from './../data/birds';

// *** Action Types ***
export const LOAD_ALARMS = 'LOAD_ALARMS';
export const UPDATE_ALARMS_LIST = 'UPDATE_ALARMS_LIST';

export const NEW_ALARM = 'NEW_ALARM';
export const CHECK_ALARMS = 'CHECK_ALARMS';
export const STOP_ALARM = 'STOP_ALARM';
export const SNOOZE_ALARM = 'SNOOZE_ALARM';
export const SET_ACTIVE_ALARM = 'SET_ACTIVE_ALARM';
export const SET_EDIT_ALARM = 'SET_EDIT_ALARM';
export const EDIT_ALARM_TIME = 'EDIT_ALARM_TIME';
export const EDIT_ALARM_CHORUS = 'EDIT_ALARM_CHORUS';
export const EDIT_ALARM_LABEL = 'EDIT_ALARM_LABEL';
export const EDIT_ALARM_REPEAT = 'EDIT_ALARM_REPEAT';
export const SAVE_ALARM = 'SAVE_ALARM';

let alarms = []; // list of alarm
let activeAlarm = null; // alarm object

export function loadAlarms(alarmID, missedAlarms) {
  return async (dispatch) => {
    // Get alarms from storage
    let storedAlarms = await AsyncStorage.getItem('alarms');
    alarmList = JSON.parse(storedAlarms);

    if (alarmList === null) {
      // If they have no alarms saved
      alarms = [];
      activeAlarm = null;
    } else {
      alarms = alarmList.map((alarm) => { 
        // Update alarms created in older versions of the app
        if (alarm.appVersion != 2) { 
          // Add new fields
          alarm.label = "";
          alarm.repeats = false;
          alarm.days = [true, true, true, true, true, true, true];
          alarm.highlighted = false;
          alarm.appVersion = 2;
          // Clear old notifications
          if (alarm.notificationTime !== null) {
            clearOldNotifications(alarm);
            alarm.notificationTime = null;
            alarm.notifications = [];
            alarm.snoozed = false;
            alarm.snoozeTime = null;
          }
          // Reschedule if alarm is on
          if (alarm.on) { alarm.notificationTime = scheduleAlarm(alarm); }
        }
        // clear any previously sounding alarms
        if (alarm.sounding) { 
          alarm.sounding = false; 
          if (!alarm.notificationTime) { alarm.on = false; }
          // If it doesnt have a future notification time, turn it off
        }
        // Clear highlighted alarm
        if (alarm.highlighted) { alarm.highlighted = false; }
        // If an alarm fired app
        if (alarmID !== undefined) {
          if (alarmID == alarm.uuid) {
            let nowTime = moment().valueOf();
            let alarmTime = moment(alarm.notificationTime).valueOf();
            let timeDiff = nowTime - alarmTime;
            if (timeDiff > 0 && timeDiff < 6000) {
              // IF THIS ALARM TIME, set to sounding, active
              alarm.sounding = true;
              alarm.snoozed = false;
              alarm.snoozeTime = null;
              // schedule Next Alarm
              if (alarm.repeats) { alarm.notificationTime = scheduleAlarm(alarm); } 
              else {  alarm.notificationTime = null; }
              // set as active alarm
              activeAlarm = Object.assign({}, alarm);
            } else {
              // notification bar icon was clicked, higlight the alarm in alarms list
              alarm.highlighted = true;
            }
          }
        } 
        // If app was opened on restart because an alarm was missed
        else if (missedAlarms !== undefined) {
          if (missedAlarms.contains(","+alarm.uuid+",")) {
            alarm.snoozed = false;
            alarm.snoozeTime = null;
            alarm.sounding = false;
            alarm.highlighted = true;
            if (alarm.repeats) {
              alarm.notificationTime = scheduleAlarm(alarm);
            } else {
              alarm.on = false;
              alarm.notificationTime = null;
            }
          }
        } 
        // User opened app (not from notification) and they have missed an alarm
        else if (moment().isAfter(alarm.notificationTime)) {
          alarm.snoozed = false;
          alarm.snoozeTime = null;
          alarm.sounding = false;
          if (alarm.repeats) {
            alarm.notificationTime = scheduleAlarm(alarm);
          } else {
            alarm.on = false;
            alarm.notificationTime = null;
          }
        }
        return alarm;
      });
    }

    if (activeAlarm === null) {
      SplashScreen.hide();
    }

    try {
      AsyncStorage.setItem('alarms', JSON.stringify(alarms));
      return dispatch(loadAlarmsSuccess(alarms, activeAlarm));
    } catch (error) {
      return null;
    }
  };
}


function loadAlarmsSuccess(alarmList, activeAlarm) {
  return {
    type: LOAD_ALARMS,
    alarmList,
    activeAlarm,
  };
}


function sortAlarms(alarmsList) {
  alarmsList.sort((a, b) => {
    if (a.time.hour < b.time.hour) return -1;
    else if (a.time.hour > b.time.hour) return 1;
    else if (a.time.hour === b.time.hour) {
      if (a.time.minute < b.time.minute) return -1;
      else if (a.time.minute > b.time.minute) return 1;
    }
    return 0;
  });
  return alarmsList;
}


export function newAlarm() {
  return async (dispatch) => {
    let uuid = JSON.parse(await AsyncStorage.getItem('notificationID'));
    if (uuid == null) { uuid = 0; }
    AsyncStorage.setItem('notificationID', JSON.stringify(uuid + 1));
    return dispatch({
      type: NEW_ALARM,
      chorus: getRandomBirds(birds, 3),
      uuid,
    });
  };
}



export function snoozeAlarm(alarmToSnooze) {
  // Schedule snoozed notifications
  clearNotifications(alarmToSnooze);
  const { time } = scheduleSnoozedAlarm(alarmToSnooze);
  alarmToSnooze.snoozeTime = time;
  alarmToSnooze.snoozed = true;
  alarmToSnooze.sounding = false;
  // And save changes into alarm list
  const alarmsToSave = alarms.map((alarm) => {
    if (alarm.uuid === alarmToSnooze.uuid) {
      return alarmToSnooze;
    }
    return alarm;
  });
  // ***** Storage ***** //
  // Save the new alarm data
  activeAlarm = Object.assign({}, alarmToSnooze);
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    return {
      type: SNOOZE_ALARM,
      alarmList: alarmsToSave,
      activeAlarm: activeAlarm,
    };
  } catch (error) {
    return null;
  }
}


export function stopAlarm(alarmToStop) {
  // clear any (snoozed) notifications
  if (alarmToStop.snoozed) {
    clearNotifications(alarmToStop)
    alarmToStop.snoozeTime = null;
    alarmToStop.snoozed = false;
    // schedule Next Alarm
    if (alarmToStop.repeats) { 
      alarmToStop.on = true;
      alarmToStop.notificationTime = scheduleAlarm(alarmToStop); 
    } else { 
      alarmToStop.on = false;
      alarmToStop.notificationTime = null; 
    }
  } else if (alarmToStop.sounding) {
    alarmToStop.sounding = false;
    if (alarmToStop.repeats) { 
      alarmToStop.on = true;
    } else { 
      alarmToStop.on = false;
    }
  }
  // schedule Next Alarm
  if (alarmToStop.repeats) { 
    alarmToStop.on = true;
    alarmToStop.notificationTime = scheduleAlarm(alarmToStop); 
  } else { 
    alarmToStop.on = false;
    alarmToStop.notificationTime = null; 
  }
  // This alarm already exsisted, so overwrite previous version
  const alarmsToSave = alarms.map((alarm) => {
    if (alarm.uuid === alarmToStop.uuid) { return alarmToStop; }
    return alarm;
  });
  // ***** Storage ***** //
  // Save the new alarm data
  alarms = alarmsToSave;
  activeAlarm = null;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    return {
      type: STOP_ALARM,
      alarmList: alarmsToSave,
    };
  } catch (error) {
    return null;
  }
}


export function saveAlarm(alarm, changes) {
  // Assign changes
  const alarmToSave = Object.assign({}, alarm, changes);
  // ***** Notifications ***** //
  // Notifications should be canceled 
  clearNotifications(alarmToSave);
  // (and rescheduled if alarm is on)
  if (alarmToSave.on) {
    const notificationTime = scheduleAlarm(alarmToSave);
    alarmToSave.notificationTime = notificationTime;
  }
  // ***** Alarm List ***** //
  // Now we'll put alarm into alarm list
  let alarmExists = false;
  // If this alarm already exsisted, overwrite previous version
  let alarmsToSave = alarms.map((existingAlarm) => {
    if (existingAlarm.uuid === alarmToSave.uuid) {
      alarmExists = true;
      return alarmToSave;
    }
    return existingAlarm;
  });
  // Otherwise, add the new alarm to the list
  if (!alarmExists) {
    alarmsToSave.push(alarmToSave);
  }
  // Sort the alarms
  alarmsToSave = sortAlarms(alarmsToSave);
  // ***** Storage ***** //
  // Save the new alarm data
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    return {
      type: UPDATE_ALARMS_LIST,
      alarmList: alarmsToSave,
    };
  } catch (error) {
    return null;
  }
}


export function deleteAlarm(alarmToDelete) {
  // First clear notifications
  clearNotifications(alarmToDelete);
  // Then filter deleted alarm out of the list
  const alarmsToSave = alarms.filter((alarm) => {
    if (alarm.uuid === alarmToDelete.uuid) { return false; }
    return true;
  });
  // Save alarms
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    return {
      type: UPDATE_ALARMS_LIST,
      alarmList: alarmsToSave,
    };
  } catch (error) {
    return null;
  }
}


export function setActiveAlarm(alarm) {
  return {
    type: SET_ACTIVE_ALARM,
    alarm,
  };
}

// ACTIONS FOR EDITING ALARMS
export function setEditAlarm(alarm) {
  return {
    type: SET_EDIT_ALARM,
    alarm,
  };
}


export function editAlarmTime(time) {
  return {
    type: EDIT_ALARM_TIME,
    time,
  };
}


export function editAlarmChorus(chorus) {
  return {
    type: EDIT_ALARM_CHORUS,
    chorus,
  };
}


export function editAlarmLabel(label) {
  return {
    type: EDIT_ALARM_LABEL, 
    label,
  };
}


export function editAlarmRepeat(repeats, days) {
  return {
    type: EDIT_ALARM_REPEAT,
    repeats,
    days,
  };
}
