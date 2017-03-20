import {
  SAMPLE_CHORUS,
} from '../actions/audio';

import {
  EDIT_ALARM_CHORUS,
} from '../actions/alarm';

import {
  PUSH,
  POP,
  JUMP_TO_KEY,
} from '../actions/navigator';

const initialState = {
  sampleChorus: false,
};

export default function audio(state = initialState, action) {
  switch (action.type) {
    case SAMPLE_CHORUS:
      return (Object.assign({}, state, {
        sampleChorus: action.sampleChorus,
      }));

    case POP:
    case PUSH:
    case JUMP_TO_KEY: {
      return (Object.assign({}, state, {
        sampleChorus: false,
      }));
    }

    case EDIT_ALARM_CHORUS: {
      if (action.chorus.length === 0) {
        return (Object.assign({}, state, {
          sampleChorus: false,
        }));
      }
      return state;
    }

    default:
      return state;
  }
}
