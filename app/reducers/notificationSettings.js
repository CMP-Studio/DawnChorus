import {
  UPDATE_NOTIFICATION_PERMISSIONS,
  UPDATE_SILENT_SWITCH_STATE,
  TOGGLE_INSTRUCTION_MODAL,
  NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
} from '../actions/notifications';

const initialState = {
  notificationPermission: NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
  silentSwitchOn: false,
  instructionModal: false,
};

export default function notificationSettings(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_INSTRUCTION_MODAL: {
      return (Object.assign({}, state, {
        instructionModal: action.modal,
      }));
    }

    case UPDATE_SILENT_SWITCH_STATE: {
      return (Object.assign({}, state, {
        silentSwitchOn: action.silent,
        instructionModal: !action.silent ? false : state.instructionModal,
      }));
    }

    case UPDATE_NOTIFICATION_PERMISSIONS: {
      return (Object.assign({}, state, {
        notificationPermission: action.update,
      }));
    }

    default: {
      return state;
    }
  }
}
