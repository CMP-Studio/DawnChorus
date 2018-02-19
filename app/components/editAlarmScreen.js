import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import TimePicker from './timePicker';
import ChorusListing from './chorusListing';
import ChorusEditor from '../containers/chorusEditor';
import Fab from './fab';

import { OFFWHITE, OFFBLACK, GREEN, GRAY, LIGHTGRAY, RED, globalStyles} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 270,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerBar: {
    backgroundColor: OFFWHITE,
    paddingLeft: 40, 
    paddingRight: 40,
    paddingBottom: 30,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  label: {
    color: OFFBLACK,
    fontSize: 20,
    fontFamily: 'SourceSerifPro-Light',
    height: 45,
    marginBottom: 10,
  },
  chorusListing: {
    paddingLeft: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  chorusEditor: {
    flex: 1,
  },
  repeats: {
    flex: 1,
    maxHeight: 125,
    borderRadius: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  toggle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  toggleContainer: {
    backgroundColor: LIGHTGRAY,
    borderRadius: 3,
    width: 110,
    height: 55,
    marginRight: 10,
    marginBottom: 10,
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    height: 45,
    marginBottom: 10,
  },
  dayToggles: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    opacity: 0.6,
  },
  dayToggleText: {
    width: 40, 
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 33,
    borderRadius: 20,
  },
  selectedDay: {
    borderBottomColor: GREEN,
    borderBottomWidth: 2,
    opacity: 1,
  },
  toggleButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
  },
  toggleButtonText: {
    color: OFFWHITE,
    fontSize: 16,
    fontFamily: 'SourceSerifPro-Regular',
  },
  on: {
    backgroundColor: GREEN,
  },
  off: {
    backgroundColor: RED,
  },
});

const EditAlarmScreen = (props) => {
  if (props.alarm === null) return null;
  if (props.alarm.uuid === undefined) return null;

  const { width, height } = Dimensions.get('window');
  let buttonBottom;
  if (props.alarm.repeats) {
    buttonBottom = (height - 260 - 170);
  } else {
    buttonBottom = (height - 195 - 170);
  }

  let listingRef;
  let inputRef;

  return (
    <View style={[styles.container, { width }]}>
      <View
        importantForAccessibility="yes"
        accessibilityLiveRegion={'polite'}
        accessibilityLabel="Edit Alarm."
      />
      { /** Chorus Editor **/}
      <Animatable.View
        transition={"marginTop"}
        style={[
          styles.chorusEditor,
          props.alarm.repeats ? { marginTop: 240 } : { marginTop: 175 },
        ]}
        importantForAccessibility="no"
      >
        <ChorusEditor
          onPress={() => { 
            if (this.inputRef !== undefined) {
              this.inputRef.blur(); 
            }
          }}
          limitReached={() => { 
            if (this.listingRef !== undefined) {
              this.listingRef.shake(250);
            }
          }}
        />
      </Animatable.View>
      <Animatable.View
        transition="height"
        style={[
          styles.headerContainer,
          props.alarm.repeats ? { height: 340 } : { height: 275 },
        ]}
      >
        <View style={[
          styles.headerBar,
          width < 400 ? { paddingLeft: 15, paddingRight: 15 } : {},
        ]}>
          { /** Time Picker **/}
            <TimePicker
              styles={styles.timePicker}
              onPress={() => { 
                if (this.inputRef !== undefined) {
                  this.inputRef.blur(); 
                }
              }}
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

          <TextInput
            underlineColorAndroid={GREEN}
            inlineImageLeft='labelicon'
            inlineImagePadding={15}
            style={[styles.label, {width: width - 80}]}
            onChangeText={(text) => { props.actions.editAlarmLabel(text); }}
            ref={(ref) => { this.inputRef = ref; }}
            value={props.alarm.label}
            importantForAccessibility="no"
          />

          <View 
            style={[
              styles.repeats,
              props.alarm.repeats ? { marginBottom: 15 } : {},
            ]}>
            { /** ON/OFF Toggle **/}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.toggle}
              onPress={() => { 
                if (this.inputRef !== undefined) {
                  this.inputRef.blur(); 
                }
                props.actions.editAlarmRepeat(!props.alarm.repeats, props.alarm.days)
              }}
            >
              <View
                style={[
                  styles.toggleContainer,
                  { height: 50 },
                ]}
                importantForAccessibility="yes"
                accessibilityLabel={
                  props.alarm.repeats ? `Alarm scheduled to repeat. Tap to turn repeat off.`
                                           : `Single use alarm. Tap to make alarm repeat.`
                }
              >
                <View
                  style={[
                    styles.toggleButton,
                    props.alarm.repeats && !props.disabled ? styles.on : styles.off,
                  ]}
                >
                  <Text style={styles.toggleButtonText}>
                    {props.alarm.repeats ? 'REPEAT ON' : 'REPEAT OFF'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {props.alarm.repeats &&
              <View style={styles.week}>
                <TouchableOpacity
                  onPress={()=> {
                    if (this.inputRef !== undefined) {
                      this.inputRef.blur(); 
                    }
                    let updatedDays = props.alarm.days;
                    updatedDays[0] = !props.alarm.days[0];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[0] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[0] ? "Mondays. On. Tap to turn off." : "Mondays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    let updatedDays = props.alarm.days;
                    updatedDays[1] = !props.alarm.days[1];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[1] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[1] ? "Tuesdays. On. Tap to turn off." : "Tuesdays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    Tu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    if (this.inputRef !== undefined) {
                      this.inputRef.blur(); 
                    }
                    let updatedDays = props.alarm.days;
                    updatedDays[2] = !props.alarm.days[2];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[2] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[2] ? "Wednesdays. On. Tap to turn off." : "Wednesdays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    W
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    if (this.inputRef !== undefined) {
                      this.inputRef.blur(); 
                    }
                    let updatedDays = props.alarm.days;
                    updatedDays[3] = !props.alarm.days[3];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[3] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[3] ? "Thursdays. On. Tap to turn off." : "Thursdays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    Th
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    if (this.inputRef !== undefined) {
                      this.inputRef.blur(); 
                    }
                    let updatedDays = props.alarm.days;
                    updatedDays[4] = !props.alarm.days[4];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[4] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[4] ? "Fridays. On. Tap to turn off." : "Fridays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    F
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    if (this.inputRef !== undefined) {
                      this.inputRef.blur(); 
                    }
                    let updatedDays = props.alarm.days;
                    updatedDays[5] = !props.alarm.days[5];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[5] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[5] ? "Saturdays. On. Tap to turn off." : "Saturdays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    Sat           
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    let updatedDays = props.alarm.days;
                    updatedDays[6] = !props.alarm.days[6];
                    props.actions.editAlarmRepeat(props.alarm.repeats, updatedDays)
                  }}
                  style={[ 
                    styles.dayToggles,
                    props.alarm.days[6] ? styles.selectedDay : {}
                  ]}
                  importantForAccessibility="yes"
                  accessibilityLabel={props.alarm.days[6] ? "Sundays. On. Tap to turn off." : "Sundays. Off. Tap to turn on."}
                >
                  <Text 
                    style={[
                      globalStyles.bodyTextLight,
                      styles.dayToggleText,
                    ]}
                    importantForAccessibility="no"
                  >
                    Sun
                  </Text>
                </TouchableOpacity>
              </View>
            }
          </View>

          { /** Chorus Listing **/}
          <View
            style={styles.chorusListing}
            importantForAccessibility="no"
          >
            <TouchableOpacity
              style={[
                { position: 'relative', top: -3, marginRight: 10 },
                props.alarm.chorus.length > 0 ? {
                  elevation: 2,
                  backgroundColor: OFFWHITE,
                  width: width <= 320 ? 36 : 40,
                  height: width <= 320 ? 36 : 40,
                  borderRadius: width <= 320 ? 18 : 20,
                } : {},
              ]}
              accessible={true}
              accessibilityLabel={props.sampleChorus ? 'Tap to stop sampling chorus.' : 'Tap to sample chorus.'}
              accessibilityTraits={['button', 'startsMedia']}
              activeOpacity={props.alarm.chorus.length > 0 ? 0.7 : 1}
              onPress={() => {
                if (this.inputRef !== undefined) {
                  this.inputRef.blur(); 
                }
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
                  if (this.inputRef !== undefined) {
                    this.inputRef.blur(); 
                  }
                  const updatedChorus = props.alarm.chorus.filter((chorusBird) => {
                    return bird.uuid !== chorusBird.uuid;
                  });
                  props.actions.editAlarmChorus(updatedChorus);
                }}
                emptySlotPress={() => {
                  if (this.chorusEditorRef !== undefined) {
                    this.chorusEditorRef.focus();
                  }
                }}
                birdSize={width <= 320 ? 36 : 40}
                margin={10}
              />
            </Animatable.View>
          </View>
        </View>
        <Image
          importantForAccessibility="no"
          resizeMode={'stretch'}
          source={require('../assets/EditAlarmBottom.png')}
          style={{ position: 'absolute', bottom: 3, width, height: 30 }}
        />
      </Animatable.View>

      <Fab
        color={GREEN}
        onPress={() => { 
          if (this.inputRef !== undefined) {
            this.inputRef.blur(); 
          }
          props.actions.saveAlarm(props.alarm, { on: true }); 
        }}
        image={require('../assets/SaveButton.png')}
        accessibilityLabel={props.alarm.chorus.length > 0 ? 'Tap to Save Alarm.' : 'You must select at least one bird before saving.'}
        position={{ position: 'absolute', right: 30, bottom: buttonBottom }}
        style={{ position: 'absolute', bottom: 100, right: 30 }}
        visible={true}
        enabled={props.alarm.chorus.length > 0}
        disabledImage={require('../assets/DisabledSave.png')}
      />
      
    </View>
  );
};

EditAlarmScreen.propTypes = {
  alarm: PropTypes.object,
  sampleChorus: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    editAlarmTime: PropTypes.func.isRequired,
    editAlarmChorus: PropTypes.func.isRequired,
    editAlarmLabel: PropTypes.func.isRequired,
    editAlarmRepeat: PropTypes.func.isRequired,
    saveAlarm: PropTypes.func.isRequired,
    toggleSampleChorus: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditAlarmScreen;
