import * as NavigationStateUtils from 'NavigationStateUtils';
import { Platform } from 'react-native';

import {
  PUSH,
  POP,
  JUMP_TO_KEY,
  /** Screens **/
  ABOUT_THE_BIRDS_SCREEN,
  ALARM_LIST_SCREEN,
  NEW_ALARM_SCREEN,
  EDIT_ALARM_SCREEN,
  ALARM_SCREEN,
  INFO_CARDS_SCREEN,
} from '../actions/navigator';

import {
  SHOW_INFO_CARDS,
  CLOSE_INFO_CARDS,
} from '../actions/infoCards';

import {
  UPDATE_ALARMS_LIST,
  SET_ACTIVE_ALARM,
  SET_EDIT_ALARM,
  NEW_ALARM,
  STOP_ALARM,
  SOUND_ALARM,
  SNOOZE_ALARM,
} from '../actions/alarm';

let initialState = {};

if (Platform.OS === 'ios') {
  initialState = {
    index: 1,
    routes: [
      { key: ABOUT_THE_BIRDS_SCREEN },
      { key: ALARM_LIST_SCREEN },
    ],
  };
} else if (Platform.OS === 'android') {
  initialState = {
    index: 0,
    routes: [
      { key: ALARM_LIST_SCREEN },
    ],
  };
}

export default function navigator(state = initialState, action) {
  switch (action.type) {
    case PUSH:
      if (state.routes[state.index].key === action.state.key) return state;
      return NavigationStateUtils.push(state, action.state);

    case POP:
      if (state.index === 0 || state.routes.length === 1) return state;
      return NavigationStateUtils.pop(state);

    case SHOW_INFO_CARDS:
      if (Platform.OS === 'android') {
        if (state.routes[state.index].key === INFO_CARDS_SCREEN) return state;
        return NavigationStateUtils.push(state, { key: INFO_CARDS_SCREEN });
      }
      return state;

    case CLOSE_INFO_CARDS:
      if (Platform.OS === 'android') {
        if (state.routes[state.index].key === INFO_CARDS_SCREEN) return NavigationStateUtils.pop(state);
        return state;
      }
      return state;

    case JUMP_TO_KEY:
      return NavigationStateUtils.jumpTo(state, action.key);

    case SOUND_ALARM:
    case SNOOZE_ALARM:
    case SET_ACTIVE_ALARM:
      if (state.routes[state.index].key === ALARM_SCREEN) return state;
      return NavigationStateUtils.push(state, { key: ALARM_SCREEN });

    case STOP_ALARM:
      if (state.routes[state.index].key === ALARM_SCREEN) return NavigationStateUtils.pop(state);
      return state;

    case NEW_ALARM:
      if (state.routes[state.index].key !== ALARM_LIST_SCREEN) return state;
      return NavigationStateUtils.push(state, { key: NEW_ALARM_SCREEN });

    case SET_EDIT_ALARM:
      if (state.routes[state.index].key !== ALARM_LIST_SCREEN) return state;
      return NavigationStateUtils.push(state, { key: EDIT_ALARM_SCREEN });

    case UPDATE_ALARMS_LIST:
      if (state.routes[state.index].key === EDIT_ALARM_SCREEN ||
          state.routes[state.index].key === NEW_ALARM_SCREEN ||
          state.routes[state.index].key === ALARM_SCREEN
      ) { return NavigationStateUtils.pop(state); }
      return state;

    default:
      return state;
  }
}
