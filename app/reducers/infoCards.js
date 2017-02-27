import {
  SHOW_INFO_CARDS,
  CLOSE_INFO_CARDS,
} from '../actions/infoCards';

import {
  SOUND_ALARM,
  SNOOZE_ALARM,
  STOP_ALARM,
} from '../actions/alarm';

const initialState = {
  currentCard: null,
};

export default function infoCards(state = initialState, action) {
  switch (action.type) {
    case SHOW_INFO_CARDS:
      return (Object.assign({}, state, {
        currentCard: {
          index: action.index,
          bird: action.bird,
        },
      }));

    case CLOSE_INFO_CARDS:
    case SOUND_ALARM:
    case SNOOZE_ALARM:
    case STOP_ALARM: {
      return (Object.assign({}, state, {
        currentCard: null,
      }));
    }

    default:
      return state;
  }
}
