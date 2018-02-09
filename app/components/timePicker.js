import React, { PropTypes } from 'react';

import {
  TimePickerAndroid,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState,
} from 'react-native';

import {
  getTimeStrings,
} from './../utilities.js';

import { OFFBLACK } from '../styles';

const styles = StyleSheet.create({
  pickerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  time: {
    color: OFFBLACK,
    fontSize: 46,
    lineHeight: 50,
    fontFamily: 'SourceSerifPro-Regular',
  },
  ampm: {
    color: OFFBLACK,
    fontSize: 24,
  },
  valueScroller: {
    height: 135,
    flex: 1,
  },
});

const TimePicker = (props) => {
  const {
    hourString,
    minuteString,
    periodString,
  } = getTimeStrings(props.time);

  async function showPicker(stateKey, options) {
    try {
      const { action, minute, hour } = await TimePickerAndroid.open({
        hour: props.time.hour,
        minute: props.time.minute,
        is24hour: false,
      });
      if (action === TimePickerAndroid.timeSetAction) {
        props.editAlarmTime({ hour, minute });
      }
    } catch ({ code, message }) {
      console.log('Error with android time picker');
    }
  }

  return (
    <TouchableOpacity
      style={styles.pickerStyle}
      onPress={() => { 
          props.onPress();
          showPicker(); 
        }}
      importantForAccessibility="yes"
      accessibilityLabel={`Alarm set for ${hourString}:${minuteString} ${periodString}. Tap to set time.`}
    >
    <Text style={styles.time} importantForAccessibility="no">
      {`${hourString}:${minuteString}`}
      <Text style={styles.ampm} importantForAccessibility="no">
        {` ${periodString}`}
      </Text>
    </Text>
  </TouchableOpacity>
  );
};

TimePicker.propTypes = {
  time: PropTypes.object.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  editAlarmTime: PropTypes.func.isRequired,
};

export default TimePicker;
