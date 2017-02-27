import {
  UPDATE_NOTIFICATION_PERMISSIONS,
  UPDATE_SILENT_SWITCH_STATE,
  NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
} from '../actions/notifications';

const initialState = {
  notificationPermission: NOTIFICATION_PERMISSIONS_STATUS_NOTDETERMINED,
  silentSwitchOn: false,
};

export default function notificationSettings(state = initialState, action) {
  switch (action.type) {

    case UPDATE_SILENT_SWITCH_STATE: {
      return (Object.assign({}, state, {
        silentSwitchOn: action.silent,
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
