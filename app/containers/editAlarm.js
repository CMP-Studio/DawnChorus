import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditAlarmScreen from '../components/editAlarmScreen';

import {
  toggleSampleChorus,
} from '../actions/audio';

import {
  editAlarmTime,
  editAlarmChorus,
  saveAlarm,
} from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    alarm: state.alarms.editAlarm,
    screenReader: state.accessibility.screenReader,
    sampleChorus: state.audio.sampleChorus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        toggleSampleChorus,
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
