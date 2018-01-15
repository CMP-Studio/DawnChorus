import {
  UPDATE_NOTIFICATION_PERMISSIONS,
  UPDATE_SILENT_SWITCH_STATE,
  UPDATE_PUSH_NOTIFICATION_ID,
  TOGGLE_INSTRUCTION_MODAL,
  NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
} from '../actions/notifications';

const initialState = {
  notificationPermission: NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
  silentSwitchOn: false,
  instructionModal: false,
  pushNotificationId: null,
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

    case UPDATE_PUSH_NOTIFICATION_ID: {
      return (Object.assign({}, state, {
        pushNotificationId: action.id,
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
