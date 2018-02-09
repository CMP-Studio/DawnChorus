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
  EDIT_ALARM_LABEL,
  EDIT_ALARM_REPEAT,
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
    label: "",
    repeats: false,
    days: [true, true, true, true, true, true, true],
    notificationTime: null,
    chorus: [],
    snoozed: false,
    snoozeTime: null,
    highlighted: false,
    appVersion: 2,
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
            activeAlarm: action.activeAlarm,
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

    case EDIT_ALARM_LABEL: {
      const editAlarm = Object.assign({}, state.editAlarm);
      editAlarm.label = action.label;

      return (
        Object.assign({},
          state,
          { editAlarm }
        )
      );
    }

    case EDIT_ALARM_REPEAT: {
      const editAlarm = Object.assign({}, state.editAlarm);
      if ((action.days.filter((day) => {return day})).length === 0) {
        if (action.repeats === true && state.editAlarm.repeats === false) {
          editAlarm.days = [true, true, true, true, true, true, true];
        } else {
          editAlarm.repeats = false;
        }
      } else {
        editAlarm.repeats = action.repeats;
        editAlarm.days = action.days;
      }
      

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
