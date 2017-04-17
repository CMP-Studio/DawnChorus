import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AlarmListScreen from '../components/alarmListScreen';

import {
  newAlarm,
  saveAlarm,
  deleteAlarm,
  setEditAlarm,
  setActiveAlarm,
} from '../actions/alarm';

import {
  navigatorPush,
  navigatorPop,
} from '../actions/navigator';

import {
  toggleInstructionModal,
} from '../actions/notifications';

const mapStateToProps = (state) => {
  return {
    screenReader: state.accessibility.screenReader,
    alarms: state.alarms.alarmList,
    loaded: state.alarms.loaded,
    notificationPermission: state.notificationSettings.notificationPermission,
    silentSwitchOn: state.notificationSettings.silentSwitchOn,
    instructionModal: state.notificationSettings.instructionModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        newAlarm,
        saveAlarm,
        deleteAlarm,
        setEditAlarm,
        setActiveAlarm,
        navigatorPush,
        navigatorPop,
        toggleInstructionModal,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmListScreen);
