import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import ChorusListing from './chorusListing';

import { getTimeStrings } from './../utilities.js';

import { LIGHTGRAY, OFFWHITE, RED, GREEN, OFFBLACK, DARKGREEN } from './../styles.js';

const styles = StyleSheet.create({
  alarm: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  info: {
    flex: 0.6,
    paddingTop: 5,
    paddingBottom: 10,
  },
  time: {
    color: OFFBLACK,
    fontSize: 36,
    fontFamily: 'SourceSerifPro-Regular',
  },
  snoozed: {
    fontFamily: 'SourceSerifPro-Light',
    color: OFFBLACK,
    fontSize: 20,
  },
  now: {
    fontFamily: 'SourceSerifPro-Light',
    color: OFFBLACK,
    fontSize: 16,
  },
  ampm: {
    color: OFFBLACK,
    fontSize: 20,
  },
  toggle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    borderRadius: 3,
  },
  toggleContainer: {
    backgroundColor: LIGHTGRAY,
    borderRadius: 3,
    width: 50,
  },
  toggleButton: {
    position: 'absolute',
    left: 5,
    width: 40,
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
    top: 5,
    backgroundColor: GREEN,
  },
  off: {
    bottom: 5,
    backgroundColor: RED,
  },
  arrow: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
    flexDirection: 'row',
  },
});

class AlarmListing extends Component {

  static accessibilityLiveRegion = 'none';

  static propTypes = {
    alarm: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    screenReader: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    disabledOnPress: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      saveAlarm: PropTypes.func.isRequired,
      deleteAlarm: PropTypes.func.isRequired,
      setEditAlarm: PropTypes.func.isRequired,
      setActiveAlarm: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      needToClose: false,
    };
  }

  componentWillUpdate() {
    this.accessibilityLiveRegion = 'polite';
  }

  render() {
    const alarmTime = getTimeStrings(this.props.alarm.time);
    let snoozeTime;
    if (this.props.alarm.snoozeTime !== null) {
      snoozeTime = getTimeStrings(this.props.alarm.snoozeTime);
    }

    return (
      <View
        style={styles.alarm}
      >
        <Swipeout
          right={[{
            text: 'DELETE',
            backgroundColor: RED,
            underlayColor: OFFWHITE,
            color: OFFWHITE,
            fontSize: 16,
            fontFamily: 'SourceSerifPro-Regular',
            onPress: () => { this.props.actions.deleteAlarm(this.props.alarm.uuid); },
          }]}
          close={this.state.needToClose}
          backgroundColor={'transparent'}
          style={{ backgroundColor: RED, flex: 1 }}
          onOpen={() => {
            this.setState({ swipeoutOpen: true });
          }}
          onClose={() => {
            this.setState({ swipeoutOpen: false, needToClose: false });
          }}
        >
          { /** ON/OFF Toggle **/}
          <TouchableOpacity
            activeOpacity={!this.props.disabled ? 0.7 : 1}
            style={styles.toggle}
            onPress={() => {
              if (!this.props.disabled) {
                if (this.props.alarm.on) {
                  this.props.actions.saveAlarm(this.props.alarm, {
                    on: false,
                    sounding: false,
                    snoozed: false,
                    snoozeTime: null,
                    notificationTime: null,
                  });
                } else {
                  this.props.actions.saveAlarm(this.props.alarm, { on: true });
                }
              } else {
                this.props.disabledOnPress();
              }
            }}
          >
            <View
              style={[
                styles.toggleContainer,
                this.props.screenReader ? { flex: 1 } : { height: 70 },
              ]}
              importantForAccessibility="yes"
              accessibilityLiveRegion={this.accessibilityLiveRegion}
              accessibilityLabel={
                this.props.alarm.on ? `Alarm ${this.props.index + 1} of ${this.props.total}. On. Scheduled for ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString}. Tap to turn off.`
                                    : `Alarm ${this.props.index + 1} of ${this.props.total}. Off. Set for ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString}. Tap to turn on.`
              }
            >
              <View
                style={[
                  styles.toggleButton,
                  this.props.alarm.on && !this.props.disabled ? styles.on : styles.off,
                ]}
              >
                <Text
                  style={styles.toggleButtonText}
                >
                  {this.props.alarm.on ? 'ON' : 'OFF'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            accessible={true}
            importantForAccessibility="yes"
            accessibilityLabel={
              this.props.alarm.on ? `Alarm ${this.props.index + 1} of ${this.props.total}. ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString}. Tap to edit.`
                                  : `Alarm ${this.props.index + 1} of ${this.props.total}. ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString}. Tap to edit.`
            }
            activeOpacity={!this.props.disabled ? 0.7 : 1}
            style={{ flex: 0.8, flexDirection: 'row' }}
            onPress={() => {
              if (this.state.swipeoutOpen) {
                this.setState({ needToClose: true });
              } else if (this.props.disabled) {
                this.props.disabledOnPress();
              } else if (this.props.alarm.sounding || this.props.alarm.snoozed) {
                this.props.actions.setActiveAlarm(this.props.alarm);
              } else {
                this.props.actions.setEditAlarm(this.props.alarm);
              }
            }}
          >

            { /** Time Display and Chorus  **/}
            <View
              style={[styles.info,
                !this.props.alarm.on ? { opacity: 0.3 } : {},
              ]}
            >
              <Text style={styles.time}>
                {`${alarmTime.hourString}:${alarmTime.minuteString}`}
                <Text style={styles.ampm}>
                  {` ${alarmTime.periodString}`}
                </Text>
              </Text>
              {!this.props.alarm.snoozed &&
              !this.props.alarm.sounding &&
                <View style={{ position: 'relative', top: -3, left: -1 }}>
                  <ChorusListing
                    chorus={this.props.alarm.chorus}
                    birdSize={28}
                    margin={4}
                  />
                </View>
              }
              {this.props.alarm.snoozed &&
                <View style={{ position: 'relative', top: -3, left: -1 }}>
                  <Text style={[styles.time, styles.snoozed]}>
                    {`Snoozed until ${snoozeTime.hourString}:${snoozeTime.minuteString}`}
                  </Text>
                </View>
              }
              {this.props.alarm.sounding &&
                <View style={{ position: 'relative', top: -3, left: -1 }}>
                  <Text style={[styles.time, styles.now]}>
                    Now! Tap to hear chorus.
                  </Text>
                </View>
              }
            </View>

            { /** Arrow **/}
            { !this.props.disabled &&
              <View style={styles.arrow}>
                <Image
                  style={Platform.OS === 'ios' ?
                  { width: 16, height: 16, resizeMode: 'contain', tintColor: DARKGREEN } :
                  { width: 25, height: 25, resizeMode: 'contain', tintColor: DARKGREEN }
                }
                  source={Platform.OS === 'ios' ? require('../assets/RightFacingArrow.png') : require('../assets/EditButton.png')}
                />
              </View>
            }
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }
}

export default AlarmListing;
