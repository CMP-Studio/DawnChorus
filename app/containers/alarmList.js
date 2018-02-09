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


const mapStateToProps = (state) => {
  return {
    alarms: state.alarms.alarmList,
    loaded: state.alarms.loaded,
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
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmListScreen);
