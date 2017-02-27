import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditAlarmScreen from '../components/editAlarmScreen';

import {
  editAlarmTime,
  editAlarmChorus,
  saveAlarm,
} from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    alarm: state.alarms.editAlarm,
    screenReader: state.accessibility.screenReader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        editAlarmTime,
        editAlarmChorus,
        saveAlarm,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAlarmScreen);
