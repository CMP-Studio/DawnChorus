import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AlarmScreen from '../components/alarmScreen';

import { snoozeAlarm, stopAlarm } from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    navigatorKey: state.navigator.routes[state.navigator.index].key,
    alarm: state.alarms.activeAlarm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        snoozeAlarm,
        stopAlarm,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmScreen);