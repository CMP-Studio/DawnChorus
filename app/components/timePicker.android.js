import React, { PropTypes } from 'react';

import {
  TimePickerAndroid,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  getTimeStrings,
} from './../utilities.js';

import { OFFBLACK } from '../styles';

const styles = StyleSheet.create({
  pickerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pickerTextLarge: {
    fontSize: 60,
    height: 65,
    marginRight: 5,
    fontFamily: 'SourceSerifPro-Regular',
    color: OFFBLACK,
    textAlign: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pickerText: {
    height: 45,
    fontSize: 36,
    fontFamily: 'SourceSerifPro-Regular',
    color: OFFBLACK,
    textAlign: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
    <View
      style={{ flex: 1 }}
      accessibilityLabel={`Alarm set for ${hourString}:${minuteString} ${periodString}.`}
      accessibilityLiveRegion={'polite'}
    >
      <TouchableOpacity
        style={styles.pickerStyle}
        onPress={() => { showPicker(); }}
        accessibilityLabel={'Tap to set time.'}
      >
        <Text style={styles.pickerTextLarge}>
          {hourString}
        </Text>
        <Text style={[styles.pickerTextLarge, { fontSize: 42, height: 55, marginRight: 3 }]}>
          :
        </Text>
        <Text style={styles.pickerTextLarge}>
          {minuteString}
        </Text>
        <Text style={styles.pickerText}>
          {periodString}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

TimePicker.propTypes = {
  time: PropTypes.object.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  editAlarmTime: PropTypes.func.isRequired,
};

export default TimePicker;
