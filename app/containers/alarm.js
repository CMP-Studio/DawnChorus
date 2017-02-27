import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AlarmScreen from '../components/alarmScreen';

import { showInfoCards } from '../actions/infoCards';
import { snoozeAlarm, stopAlarm } from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    screenReader: state.accessibility.screenReader,
    navigatorKey: state.navigator.routes[state.navigator.index].key,
    alarm: state.alarms.activeAlarm,
    infoCards: (state.infoCards.currentCard !== null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        showInfoCards,
        snoozeAlarm,
        stopAlarm,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlarmScreen);
