import { AsyncStorage } from 'react-native';
import moment from 'moment';

import {
  scheduleAlarm,
  scheduleSnoozedAlarm,
  clearNotifications,
} from './notifications.js';

import { getRandomBirds } from '../utilities.js';

import birds from './../data/birds';

// *** Action Types ***
export const LOAD_ALARMS = 'LOAD_ALARMS';
export const UPDATE_ALARMS_LIST = 'UPDATE_ALARMS_LIST';

export const NEW_ALARM = 'NEW_ALARM';
export const CHECK_ALARMS = 'CHECK_ALARMS';
export const SOUND_ALARM = 'SOUND_ALARM';
export const STOP_ALARM = 'STOP_ALARM';
export const SNOOZE_ALARM = 'SNOOZE_ALARM';
export const SET_ACTIVE_ALARM = 'SET_ACTIVE_ALARM';
export const SET_EDIT_ALARM = 'SET_EDIT_ALARM';
export const EDIT_ALARM_TIME = 'EDIT_ALARM_TIME';
export const EDIT_ALARM_CHORUS = 'EDIT_ALARM_CHORUS';
export const SAVE_ALARM = 'SAVE_ALARM';

let alarms;
let activeAlarm = null;

function loadAlarmsSuccess(alarmList, active) {
  return {
    type: LOAD_ALARMS,
    alarmList,
    activeAlarm: active,
  };
}

function checkForLingeringAlarms(alarmList) {
  const now = moment();
  return alarmList.map((alarm) => {
    if (alarm.notificationTime !== null) {
      const alarmTimeDiff = now.diff(alarm.notificationTime, 'minutes');
      if (alarmTimeDiff >= 5) {
        clearNotifications(alarm);
        return (Object.assign({}, alarm, {
          on: false,
          snoozeTime: null,
          snoozed: false,
          sounding: false,
          notificationTime: null,
        }));
      }
    } else if (alarm.snoozeTime !== null) {
      const snoozeTimeDiff = now.diff(alarm.snoozeTime.actual, 'minutes');
      if (snoozeTimeDiff >= 5) {
        clearNotifications(alarm);
        return (Object.assign({}, alarm, {
          on: false,
          snoozeTime: null,
          snoozed: false,
          sounding: false,
          notificationTime: null,
        }));
      }
    }
    return alarm;
  });
}

export function loadAlarms() {
  return async (dispatch) => {
    const alarmList = await AsyncStorage.getItem('alarms');
    const activeAlarmUUID = await AsyncStorage.getItem('activeAlarm');

    if (alarmList !== null) {
      // check for alarms that have gone off without being turned 'off'
      // if found, turn those alarms off
      const verifiedAlarmList = checkForLingeringAlarms(JSON.parse(alarmList));
      // set local alarm list
      alarms = verifiedAlarmList;

      // double check that active alarm is in list (and on) otherwise set it to null
      const activeAlarmListing = verifiedAlarmList.filter((alarm) => {
        return (alarm.uuid === JSON.parse(activeAlarmUUID) && alarm.on);
      });

      // set locally active alarm
      if (activeAlarmListing.length > 0) {
        activeAlarm = activeAlarmListing[0].uuid;
      }

      // send to reducer
      return dispatch(
        loadAlarmsSuccess(
          verifiedAlarmList,
          activeAlarmListing.length > 0 ? activeAlarmListing[0] : null
        ),
      );
    }
    alarms = [];
    return dispatch(loadAlarmsSuccess([], null));
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

    if (uuid == null) {
      uuid = 0;
    }

    AsyncStorage.setItem('notificationID', JSON.stringify(uuid + 1));

    return dispatch({
      type: NEW_ALARM,
      chorus: getRandomBirds(birds, 3),
      uuid,
    });
  };
}

export function replaceAlarm(uuid, snoozed = false) {
  // Find alarm from list
  let alarmToSound = alarms.filter((alarm) => {
    return alarm.uuid === uuid;
  })[0];

  let alarmToStop = alarms.filter((alarm) => {
    return alarm.uuid === activeAlarm;
  })[0];

  // New Alarm: Any remaining notifications should be canceled
  clearNotifications(alarmToSound);
  alarmToSound = (Object.assign({}, alarmToSound, {
    snoozed,
    sounding: !snoozed,
    snoozeTime: snoozed ? scheduleSnoozedAlarm(alarmToSound).time : null,
    notificationTime: null,
  }));

  // Old Alarm: Any remaining notifications should be canceled, turn alarm off
  clearNotifications(alarmToStop);
  alarmToStop = (Object.assign({}, alarmToStop, {
    snoozeTime: null,
    snoozed: false,
    sounding: false,
    on: false,
    notificationTime: null,
  }));

  // Replace both alarms in alarms list
  let activeAlarmIndex;
  const alarmsToSave = alarms.map((existingAlarm, index) => {
    if (existingAlarm.uuid === alarmToStop.uuid) { return alarmToStop; }
    if (existingAlarm.uuid === alarmToSound.uuid) {
      activeAlarmIndex = index;
      return alarmToSound;
    }
    return existingAlarm;
  });

  // ***** Storage ***** //
  // Save the new alarm data
  activeAlarm = uuid;
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    AsyncStorage.setItem('activeAlarm', JSON.stringify(uuid));
    return {
      type: SOUND_ALARM,
      uuid: alarmToSound.uuid,
      alarmList: alarmsToSave,
      activeAlarmIndex,
    };
  } catch (error) {
    return null;
  }
}

export function soundAlarm(uuid) {
  if (activeAlarm !== null && activeAlarm !== uuid) {
    return replaceAlarm(uuid);
  }

  // Find alarm from list
  let alarmToSound = alarms.filter((alarm) => {
    return alarm.uuid === uuid;
  })[0];

  // Any remaining notifications should be canceled
  clearNotifications(alarmToSound);
  alarmToSound = (Object.assign({}, alarmToSound, {
    sounding: true,
    snoozed: false,
    snoozeTime: null,
    notificationTime: null,
  }));

  // This alarm already exsisted, so overwrite previous version
  let activeAlarmIndex;
  const alarmsToSave = alarms.map((existingAlarm, index) => {
    if (existingAlarm.uuid === alarmToSound.uuid) {
      activeAlarmIndex = index;
      return alarmToSound;
    }
    return existingAlarm;
  });

  // ***** Storage ***** //
  // Save the new alarm data
  activeAlarm = uuid;
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    AsyncStorage.setItem('activeAlarm', JSON.stringify(uuid));
    return {
      type: SOUND_ALARM,
      uuid: alarmToSound.uuid,
      alarmList: alarmsToSave,
      activeAlarmIndex,
    };
  } catch (error) {
    return null;
  }
}


export function stopAlarm(uuid) {
  // Find alarm from list
  let alarmToStop = alarms.filter((alarm) => {
    return alarm.uuid === uuid;
  })[0];

  // Any remaining notifications should be canceled, and turn alarm off
  clearNotifications(alarmToStop);
  alarmToStop = (Object.assign({}, alarmToStop, {
    snoozeTime: null,
    snoozed: false,
    sounding: false,
    on: false,
    notificationTime: null,
  }));

  // This alarm already exsisted, so overwrite previous version
  const alarmsToSave = alarms.map((existingAlarm) => {
    if (existingAlarm.uuid === alarmToStop.uuid) { return alarmToStop; }
    return existingAlarm;
  });

  // ***** Storage ***** //
  // Save the new alarm data
  alarms = alarmsToSave;
  activeAlarm = null;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    AsyncStorage.setItem('activeAlarm', JSON.stringify(null));
    return {
      type: STOP_ALARM,
      alarmList: alarmsToSave,
    };
  } catch (error) {
    return null;
  }
}

export function cancelAllAlarms() {
  const alarmsToSave = alarms.map((alarm) => {
    clearNotifications(alarm);
    const stoppedAlarm = (Object.assign({}, alarm, {
      on: false,
      sounding: false,
      snoozed: false,
      snoozeTime: null,
      notificationTime: null,
    }));
    return stoppedAlarm;
  });

  // ***** Storage ***** //
  // Save the new alarm data
  activeAlarm = null;
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    AsyncStorage.setItem('activeAlarm', JSON.stringify(null));
    return {
      type: UPDATE_ALARMS_LIST,
      alarmList: alarmsToSave,
    };
  } catch (error) {
    return null;
  }
}

export function snoozeAlarm(uuid) {
  if (activeAlarm !== null && activeAlarm !== uuid) {
    return replaceAlarm(uuid, true);
  }

  // Find alarm from list
  let alarmToSnooze = alarms.filter((alarm) => {
    return alarm.uuid === uuid;
  })[0];

  // Any remaining notifications should be canceled
  clearNotifications(alarmToSnooze);
  // reschedule notifications
  const { time } = scheduleSnoozedAlarm(alarmToSnooze);
  alarmToSnooze = (Object.assign({}, alarmToSnooze, {
    snoozeTime: time,
    snoozed: true,
    sounding: false,
    notificationTime: null,
  }));

  // This alarm already exsisted, so overwrite previous version
  let activeAlarmIndex;
  const alarmsToSave = alarms.map((existingAlarm, index) => {
    if (existingAlarm.uuid === alarmToSnooze.uuid) {
      activeAlarmIndex = index;
      return alarmToSnooze;
    }
    return existingAlarm;
  });

  // ***** Storage ***** //
  // Save the new alarm data
  activeAlarm = uuid;
  alarms = alarmsToSave;
  try {
    AsyncStorage.setItem('alarms', JSON.stringify(alarmsToSave));
    AsyncStorage.setItem('activeAlarm', JSON.stringify(uuid));
    return {
      type: SNOOZE_ALARM,
      alarmList: alarmsToSave,
      activeAlarmIndex,
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

export function saveAlarm(alarm, changes) {
  // Assign changes
  const alarmToSave = Object.assign({}, alarm, changes);
  // ***** Notifications ***** //
  // Notifications should be canceled (and rescheduled if alarm is on)
  clearNotifications(alarmToSave);

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

export function deleteAlarm(deleteUUID) {
  const alarmsToSave = alarms.filter((existingAlarm) => {
    if (existingAlarm.uuid === deleteUUID) {
      clearNotifications(existingAlarm);
      return false;
    }
    return true;
  });

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

// This function is only used if notifications are dissallowed
export function checkAlarms(dispatch) {
  const now = moment();
  const hour = now.hour();
  const minute = now.minute();
  let activeAlarmObject = null;
  let foundAlarm = false;

  // See if any alarms should sound
  alarms.map((alarm) => {
    if (alarm.uuid === activeAlarm) {
      activeAlarmObject = alarm;
      return alarm;
    }
    if (alarm.on && alarm.time.hour === hour && alarm.time.minute === minute) {
      dispatch(soundAlarm(alarm.uuid));
      foundAlarm = true;
    }
    return alarm;
  });

  if (foundAlarm) return;

  // Sound snoozed alarm if needed
  if (activeAlarmObject !== null && activeAlarmObject.snoozed) {
    if (activeAlarmObject.snoozeTime.hour === hour &&
        activeAlarmObject.snoozeTime.minute === minute) {
      dispatch(soundAlarm(activeAlarm));
    }
  }
}
