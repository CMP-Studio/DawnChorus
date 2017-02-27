import {
  UPDATE_SCREEN_READER_STATUS,
} from '../actions/accessibility';

const initialState = {
  screenReader: false,
};

export default function notificationSettings(state = initialState, action) {
  switch (action.type) {


    case UPDATE_SCREEN_READER_STATUS: {
      return (Object.assign({}, state, {
        screenReader: action.status,
      }));
    }

    default: {
      return state;
    }
  }
}
