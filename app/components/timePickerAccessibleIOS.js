import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Picker,
} from 'react-native';

import { OFFBLACK, OFFWHITE } from '../styles';

const styles = StyleSheet.create({
  timePicker: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pickerStyle: {
    margin: 10,
    flex: 1,
  },
  pickerText: {
    fontSize: 30,
    fontFamily: 'SourceSerifPro-Regular',
    color: OFFBLACK,
    textAlign: 'center',
  },
});

const TimePickerAccessibleIOS = (props) => {
  const hour = props.time.hour;
  const minute = props.time.minute;
  let period;
  if (hour < 12) period = 'am';
  else period = 'pm';

  return (
    <View style={styles.timePicker}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ height: 1 }}>
          <Text style={{ color: OFFWHITE }}>
            {props.time.hour === 0 ?
             `Time set to 12:${props.time.minute} ${period}.` :
             `Time set to ${(props.time.hour % 12)}:${props.time.minute} ${period}.`}
          </Text>
        </View>
        <View style={styles.timePicker}>
          <Picker
            accessible={true}
            accessibilityLabel={`${(hour + 12) % 12} o' clock.`}
            style={styles.pickerStyle}
            itemStyle={styles.pickerText}
            selectedValue={`${hour % 12}`}
            onValueChange={(value) => {
              if (period === 'am') {
                props.editAlarmTime({ hour: parseInt(value, 10), minute });
              } else {
                props.editAlarmTime({ hour: parseInt(value, 10) + 12, minute });
              }
            }}
          >
            <Picker.Item accessible={false} label="1" value="1" />
            <Picker.Item accessible={false} label="2" value="2" />
            <Picker.Item accessible={false} label="3" value="3" />
            <Picker.Item accessible={false} label="4" value="4" />
            <Picker.Item accessible={false} label="5" value="5" />
            <Picker.Item accessible={false} label="6" value="6" />
            <Picker.Item accessible={false} label="7" value="7" />
            <Picker.Item accessible={false} label="8" value="8" />
            <Picker.Item accessible={false} label="9" value="9" />
            <Picker.Item accessible={false} label="10" value="10" />
            <Picker.Item accessible={false} label="11" value="11" />
            <Picker.Item accessible={false} label="12" value="0" />
          </Picker>
          <Picker
            style={styles.pickerStyle}
            itemStyle={styles.pickerText}
            selectedValue={`${minute}`}
            onValueChange={(value) => {
              props.editAlarmTime({ hour, minute: parseInt(value, 10) });
            }}
          >
            <Picker.Item accessible={false} label="00" value="0" />
            <Picker.Item accessible={false} label="01" value="1" />
            <Picker.Item accessible={false} label="02" value="2" />
            <Picker.Item accessible={false} label="03" value="3" />
            <Picker.Item accessible={false} label="04" value="4" />
            <Picker.Item accessible={false} label="05" value="5" />
            <Picker.Item accessible={false} label="06" value="6" />
            <Picker.Item accessible={false} label="07" value="7" />
            <Picker.Item accessible={false} label="08" value="8" />
            <Picker.Item accessible={false} label="09" value="9" />
            <Picker.Item accessible={false} label="10" value="10" />
            <Picker.Item accessible={false} label="11" value="11" />
            <Picker.Item accessible={false} label="12" value="12" />
            <Picker.Item accessible={false} label="13" value="13" />
            <Picker.Item accessible={false} label="14" value="14" />
            <Picker.Item accessible={false} label="15" value="15" />
            <Picker.Item accessible={false} label="16" value="16" />
            <Picker.Item accessible={false} label="17" value="17" />
            <Picker.Item accessible={false} label="18" value="18" />
            <Picker.Item accessible={false} label="19" value="19" />
            <Picker.Item accessible={false} label="20" value="20" />
            <Picker.Item accessible={false} label="21" value="21" />
            <Picker.Item accessible={false} label="22" value="22" />
            <Picker.Item accessible={false} label="23" value="23" />
            <Picker.Item accessible={false} label="24" value="24" />
            <Picker.Item accessible={false} label="25" value="25" />
            <Picker.Item accessible={false} label="26" value="26" />
            <Picker.Item accessible={false} label="27" value="27" />
            <Picker.Item accessible={false} label="28" value="28" />
            <Picker.Item accessible={false} label="29" value="29" />
            <Picker.Item accessible={false} label="30" value="30" />
            <Picker.Item accessible={false} label="31" value="31" />
            <Picker.Item accessible={false} label="32" value="32" />
            <Picker.Item accessible={false} label="33" value="33" />
            <Picker.Item accessible={false} label="34" value="34" />
            <Picker.Item accessible={false} label="35" value="35" />
            <Picker.Item accessible={false} label="36" value="36" />
            <Picker.Item accessible={false} label="37" value="37" />
            <Picker.Item accessible={false} label="38" value="38" />
            <Picker.Item accessible={false} label="39" value="39" />
            <Picker.Item accessible={false} label="40" value="40" />
            <Picker.Item accessible={false} label="41" value="41" />
            <Picker.Item accessible={false} label="42" value="42" />
            <Picker.Item accessible={false} label="43" value="43" />
            <Picker.Item accessible={false} label="44" value="44" />
            <Picker.Item accessible={false} label="45" value="45" />
            <Picker.Item accessible={false} label="46" value="46" />
            <Picker.Item accessible={false} label="47" value="47" />
            <Picker.Item accessible={false} label="48" value="48" />
            <Picker.Item accessible={false} label="49" value="49" />
            <Picker.Item accessible={false} label="50" value="50" />
            <Picker.Item accessible={false} label="51" value="51" />
            <Picker.Item accessible={false} label="52" value="52" />
            <Picker.Item accessible={false} label="53" value="53" />
            <Picker.Item accessible={false} label="54" value="54" />
            <Picker.Item accessible={false} label="55" value="55" />
            <Picker.Item accessible={false} label="56" value="56" />
            <Picker.Item accessible={false} label="57" value="57" />
            <Picker.Item accessible={false} label="58" value="58" />
            <Picker.Item accessible={false} label="59" value="59" />
          </Picker>
          <Picker
            style={styles.pickerStyle}
            itemStyle={styles.pickerText}
            selectedValue={`${period}`}
            onValueChange={(value) => {
              if (period !== value) {
                if (value === 'am') {
                  props.editAlarmTime({ hour: hour - 12, minute });
                } else {
                  props.editAlarmTime({ hour: hour + 12, minute });
                }
              }
            }}
          >
            <Picker.Item accessible={false} label="am" value="am" />
            <Picker.Item accessible={false} label="pm" value="pm" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

TimePickerAccessibleIOS.propTypes = {
  time: PropTypes.object.isRequired,
  editAlarmTime: PropTypes.func.isRequired,
};

export default TimePickerAccessibleIOS;
