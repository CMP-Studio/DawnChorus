import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditAlarmScreen from '../components/editAlarmScreen';

import {
  toggleSampleChorus,
} from '../actions/audio';

import {
  editAlarmTime,
  editAlarmChorus,
  editAlarmLabel,
  editAlarmRepeat,
  saveAlarm,
} from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    alarm: state.alarms.editAlarm,
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
        editAlarmLabel,
        editAlarmRepeat,
        saveAlarm,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAlarmScreen);
