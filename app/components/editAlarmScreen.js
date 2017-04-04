import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import TimePicker from './timePicker';
import TimePickerAccessibleIOS from './timePickerAccessibleIOS';
import ChorusListing from './chorusListing';
import ChorusEditor from '../containers/chorusEditor';
import Fab from './fab';

import { OFFWHITE, GREEN, GRAY } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    paddingBottom: 30,
  },
  headerBar: {
    backgroundColor: OFFWHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: 200,
  },
  chorusEditor: {
    marginTop: 160,
    flex: 1,
  },
  chorusListing: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const EditAlarmScreen = (props) => {
  if (props.alarm === null) return null;
  if (props.alarm.uuid === undefined) return null;

  const { width } = Dimensions.get('window');

  let listingRef;

  return (
    <View style={[styles.container, { width }]}>
      { /** Chorus Editor **/}
      <View
        style={[
          styles.chorusEditor,
          props.screenReader ? { marginTop: 300 } : {},
        ]}
        importantForAccessibility="no"
      >
        <ChorusEditor
          limitReached={() => { this.listingRef.shake(250); }}
        />
      </View>
      <View
        style={[
          styles.headerContainer,
          props.screenReader ? { height: 300 } : {},
        ]}
      >
        <View style={styles.headerBar}>
          { /** Time Picker **/}
          <View
            style={[
              styles.timePicker,
              Platform.OS === 'ios' && !props.screenReader ? { height: 100 } : {},
            ]}
          >
            {!props.screenReader &&
            <TimePicker
              time={props.alarm.time}
              editAlarmTime={props.actions.editAlarmTime}
              onTimeChange={(change) => {
                const time = Object.assign({}, props.alarm.time);
                if (change.hour !== undefined) {
                  if (time.hour < 12) {
                    time.hour = change.hour;
                  } else if (time.hour >= 12) {
                    time.hour = change.hour + 12;
                  }
                } else if (change.minute !== undefined) {
                  time.minute = change.minute;
                } else if (change.period !== undefined) {
                  if (change.period === 'am' && time.hour >= 12) {
                    time.hour -= 12;
                  } else if (change.period === 'pm' && time.hour < 12) {
                    time.hour += 12;
                  }
                }
                props.actions.editAlarmTime(time);
              }}
            />
            }
            {props.screenReader &&
            <TimePickerAccessibleIOS
              time={props.alarm.time}
              editAlarmTime={props.actions.editAlarmTime}
            />
            }
          </View>

          { /** Chorus Listing **/}
          <View
            style={styles.chorusListing}
            importantForAccessibility="no"
          >
            <TouchableOpacity
              style={[
                { marginRight: width <= 320 ? 10 : 15, position: 'relative', top: -3 },
                props.alarm.chorus.length > 0 ? {
                  elevation: 2,
                  backgroundColor: OFFWHITE,
                  width: width <= 320 ? 36 : 40,
                  height: width <= 320 ? 36 : 40,
                  borderRadius: width <= 320 ? 18 : 20,
                } : {},
              ]}
              activeOpacity={props.alarm.chorus.length > 0 ? 0.7 : 1}
              onPress={() => {
                if (props.alarm.chorus.length) {
                  props.actions.toggleSampleChorus(!props.sampleChorus);
                }
              }}
            >
              <Image
                style={[
                  width <= 320 ? { width: 36, height: 36 } : { width: 40, height: 40 },
                  props.alarm.chorus.length > 0 ? { opacity: 1 } : { opacity: 0.3 },
                ]}
                resizeMode={'contain'}
                source={props.sampleChorus ? require('../assets/StopButton.png') : require('../assets/PlayButton.png')}
              />
            </TouchableOpacity>
            <Animatable.View
              style={{ position: 'relative', top: -3, left: -3 }}
              ref={(ref) => { this.listingRef = ref; }}
            >
              <ChorusListing
                chorus={props.alarm.chorus}
                onBirdPress={(bird) => {
                  const updatedChorus = props.alarm.chorus.filter((chorusBird) => {
                    return bird.uuid !== chorusBird.uuid;
                  });
                  props.actions.editAlarmChorus(updatedChorus);
                }}
                birdSize={width <= 320 ? 36 : 40}
                margin={width <= 320 ? 10 : 15}
              />
            </Animatable.View>
          </View>
          { Platform.OS === 'ios' &&
            <Image
              resizeMode={'stretch'}
              accessible={false}
              source={require('../assets/EditAlarmBottom.png')}
              style={{ position: 'absolute', bottom: -30, width, height: 30 }}
            />
          }
        </View>
        { Platform.OS === 'android' &&
          <Image
            importantForAccessibility="no"
            resizeMode={'stretch'}
            source={require('../assets/EditAlarmBottom.png')}
            style={{ position: 'absolute', bottom: 0, width, height: 30 }}
          />
        }
      </View>

      {props.screenReader &&
        <TouchableOpacity
          style={[
            { height: 50,
              width,
              alignItems: 'center',
              justifyContent: 'center' },
            props.alarm.chorus.length > 0 ? { backgroundColor: GREEN } : { backgroundColor: GRAY },
          ]}
          onPress={() => {
            if (props.alarm.chorus.length > 0) {
              props.actions.saveAlarm(props.alarm, { on: true });
            }
          }}
          accessible={true}
          accessibilityTraits={'header'}
          accessibilityLabel={props.alarm.chorus.length > 0 ? 'Save Alarm. Button.' : 'You must select at least one bird before saving.'}
        >
          <Text
            style={{
              color: OFFWHITE,
              fontFamily: 'SourceSerifPro-Regular',
              fontSize: 20,
              backgroundColor: 'transparent',
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      }

      {!props.screenReader &&
      <Fab
        color={GREEN}
        onPress={() => { props.actions.saveAlarm(props.alarm, { on: true }); }}
        image={require('../assets/SaveButton.png')}
        accessibilityLabel={props.alarm.chorus.length > 0 ? 'Save Alarm. Button.' : 'You must select at least one bird before saving.'}
        position={{ position: 'absolute', bottom: 30, right: 30 }}
        visible={true}
        enabled={props.alarm.chorus.length > 0}
        disabledImage={require('../assets/DisabledSave.png')}
      />
    }
    </View>
  );
};

EditAlarmScreen.propTypes = {
  alarm: PropTypes.object,
  screenReader: PropTypes.bool.isRequired,
  sampleChorus: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    editAlarmTime: PropTypes.func.isRequired,
    editAlarmChorus: PropTypes.func.isRequired,
    saveAlarm: PropTypes.func.isRequired,
    toggleSampleChorus: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditAlarmScreen;
