import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  newAlarm,
  saveAlarm,
  deleteAlarm,
} from '../actions/alarm';

import {
  navigatorPush,
  navigatorPop,
  navigatorJumpToKey,
} from '../actions/navigator';

import {
  closeInfoCards,
} from '../actions/infoCards';

import RootScreen from '../components/rootScreen';

const mapStateToProps = (state) => {
  return {
    navigator: state.navigator,
    alarms: state.alarms.alarmList,
    loaded: state.alarms.loaded,
    editAlarm: state.alarms.editAlarm,
    activeAlarm: state.alarms.activeAlarm,
    infoCards: (state.infoCards.currentCard !== null),
    notificationPermission: state.notificationSettings.notificationPermission,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        navigatorPush,
        navigatorPop,
        navigatorJumpToKey,
        newAlarm,
        saveAlarm,
        deleteAlarm,
        closeInfoCards,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootScreen);
