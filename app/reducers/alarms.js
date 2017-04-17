import {
  LOAD_ALARMS,
  UPDATE_ALARMS_LIST,
  SOUND_ALARM,
  SNOOZE_ALARM,
  STOP_ALARM,
  NEW_ALARM,
  SET_ACTIVE_ALARM,
  SET_EDIT_ALARM,
  EDIT_ALARM_TIME,
  EDIT_ALARM_CHORUS,
} from '../actions/alarm';

const initialState = {
  loaded: false,
  alarmList: [],
  newAlarm: {
    uuid: null,
    on: true,
    time: {
      hour: 8,
      minute: 30,
    },
    notificationTime: null,
    chorus: [],
    snoozed: false,
    snoozeTime: null,
  },
  editAlarm: null,
  activeAlarm: null,
};

export default function alarms(state = initialState, action) {
  switch (action.type) {

    case LOAD_ALARMS: {
      return (
        Object.assign({},
          state,
          {
            loaded: true,
            alarmList: action.alarmList,
            activeAlarm: action.activeAlarm,
          }
        )
      );
    }

    case UPDATE_ALARMS_LIST: {
      return (
        Object.assign({},
          state,
          {
            alarmList: action.alarmList,
          }
        )
      );
    }

    case SOUND_ALARM:
    case SNOOZE_ALARM: {
      return (
        Object.assign({},
          state,
          {
            activeAlarm: action.alarmList[action.activeAlarmIndex],
            alarmList: action.alarmList,
          }
        )
      );
    }

    case STOP_ALARM: {
      return (
        Object.assign({},
          state,
          {
            activeAlarm: null,
            alarmList: action.alarmList,
          }
        )
      );
    }

    case NEW_ALARM: {
      const editAlarm = Object.assign({}, state.newAlarm,
        {
          chorus: action.chorus,
          uuid: action.uuid,
        });

      return (
        Object.assign({},
          state,
          { editAlarm }
        )
      );
    }

    case SET_ACTIVE_ALARM: {
      const activeAlarm = Object.assign({}, action.alarm, {});
      return (
        Object.assign({},
          state,
          { activeAlarm }
        )
      );
    }

    case SET_EDIT_ALARM: {
      const editAlarm = Object.assign({}, action.alarm, {});
      return (
        Object.assign({},
          state,
          { editAlarm }
        )
      );
    }

    case EDIT_ALARM_TIME: {
      const editAlarm = Object.assign({}, state.editAlarm);
      editAlarm.time = action.time;

      return (
        Object.assign({},
          state,
          { editAlarm }
        )
      );
    }

    case EDIT_ALARM_CHORUS: {
      const editAlarm = Object.assign({}, state.editAlarm);
      editAlarm.chorus = action.chorus;

      return (
        Object.assign({},
          state,
          { editAlarm }
        )
      );
    }

    default:
      return state;
  }
}
