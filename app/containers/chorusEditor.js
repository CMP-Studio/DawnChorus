import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import birds from '../data/birds';

import ChorusEditor from '../components/chorusEditor';

import {
  editAlarmChorus,
} from '../actions/alarm';

const mapStateToProps = (state) => {
  return {
    birds,
    chorus: state.alarms.editAlarm.chorus,
    navigatorKey: state.navigator.routes[state.navigator.index].key,
    screenReader: state.accessibility.screenReader,
    sampleChorus: state.audio.sampleChorus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        editAlarmChorus,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChorusEditor);
