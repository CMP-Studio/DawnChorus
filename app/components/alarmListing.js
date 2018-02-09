import React, {
  PropTypes,
  Component,
  RCTUIManager,
  ReactNative,
} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import ChorusListing from './chorusListing';

import { getTimeStrings, formatLabel, getDayStrings, getDayNames } from './../utilities.js';

import { LIGHTGRAY, OFFWHITE, RED, GREEN, OFFBLACK, DARKGREEN, YELLOW } from './../styles.js';

const styles = StyleSheet.create({
  alarm: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 3,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  info: {
    flex: 0.7,
    paddingLeft: 5,
    paddingBottom: 10,
  },
  time: {
    color: OFFBLACK,
    fontSize: 46,
    lineHeight: 50,
    fontFamily: 'SourceSerifPro-Regular',
  },
  label: {
    color: OFFBLACK,
    fontSize: 20,
    paddingBottom: 3,
    fontFamily: 'SourceSerifPro-Light',
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
    fontSize: 24,
  },
  toggle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingTop: 5,
  },
  toggleContainer: {
    backgroundColor: LIGHTGRAY,
    borderRadius: 3,
    width: 50,
    height: 50,
  },
  toggleButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
  },
  toggleButtonText: {
    color: OFFWHITE,
    fontSize: 17,
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
    flex: 0.1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 15,
    height: 50,
    flexDirection: 'row',
  },
});

class AlarmListing extends Component {

  static accessibilityLiveRegion = 'none';

  static propTypes = {
    alarm: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      saveAlarm: PropTypes.func.isRequired,
      deleteAlarm: PropTypes.func.isRequired,
      setEditAlarm: PropTypes.func.isRequired,
      setActiveAlarm: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {

    const alarmTime = getTimeStrings(this.props.alarm.time);
    const alarmDays = getDayNames(this.props.alarm.days);
    let snoozeTime = null;
    if (this.props.alarm.snoozed && this.props.alarm.snoozeTime !== null) {
      snoozeTime = getTimeStrings(this.props.alarm.snoozeTime);
    }

    let alarmA11yLabel = `Alarm ${this.props.index + 1} of ${this.props.total}. `;

    if (this.props.alarm.on) {
      alarmA11yLabel += `On. Scheduled for ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString} `
    } else {
      alarmA11yLabel += `Off. Set for ${alarmTime.hourString}:${alarmTime.minuteString} ${alarmTime.periodString} `
    }

    if (this.props.alarm.repeats) {
      alarmA11yLabel += `on ${alarmDays}. `
    } else {
      alarmA11yLabel += `. Does not repeat. `
    }

    if (this.props.alarm.snoozed) {
      alarmA11yLabel += `Snoozed until ${snoozeTime.hourString}:${snoozeTime.minuteString} ${snoozeTime.periodString}. `
    }

    if (this.props.alarm.label !== "") {
      alarmA11yLabel += `Labeled ${this.props.alarm.label}. `
    }

    if (this.props.alarm.on) {
      alarmA11yLabel += "Tap to turn off."
    } else {
      alarmA11yLabel += "Tap to turn on."
    }

    return (
      <Animatable.View
        duration={1000}
        animation={this.props.alarm.highlighted ? "pulse" : ""}
        onAnimationEnd={() => {
          this.props.actions.saveAlarm(this.props.alarm, { highlighted: false });
        }}
        iterationCount={2}
        style={styles.alarm}
      >
        { /** ON/OFF Toggle **/}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.toggle}
          onPress={() => {
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
          }}
        >
          <View
            style={[
              styles.toggleContainer,
              { height: 50 },
            ]}
            importantForAccessibility="yes"
            accessibilityLiveRegion={this.accessibilityLiveRegion}
            accessibilityLabel={alarmA11yLabel}
          >
            <View
              style={[
                styles.toggleButton,
                this.props.alarm.on ? styles.on : styles.off,
              ]}
            >
              <Text style={styles.toggleButtonText}>
                {this.props.alarm.on ? 'ON' : 'OFF'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          importantForAccessibility="yes"
          accessibilityLabel={
            this.props.alarm.snoozed ? 
            `Alarm ${this.props.index + 1} of ${this.props.total} is snoozed. Tap to go to alarm screen.`
            :`Tap to edit alarm ${this.props.index + 1} of ${this.props.total}.`}
          activeOpacity={0.7}
          style={{ flex: 0.8, flexDirection: 'row' }}
          onPress={() => {
            if (this.props.alarm.sounding || this.props.alarm.snoozed) {
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

            <View >
              {snoozeTime !== null &&
                <Text style={styles.label}>
                  {`Snoozed until ${snoozeTime.hourString}:${snoozeTime.minuteString} ${snoozeTime.periodString}`}
                </Text>
              }
              {this.props.alarm.label !== undefined && this.props.alarm.label != "" &&
                <Text style={[styles.label]}>
                  {formatLabel(this.props.alarm.label)}
                </Text>
              }
              {this.props.alarm.repeats &&
                <Text style={styles.label}>
                  {getDayStrings(this.props.alarm.days)}
                </Text>
              }
            </View>
            <ChorusListing
              style={{ paddingTop: 10, paddingBottom: 10 }}
              chorus={this.props.alarm.chorus}
              birdSize={30}
              margin={8}
            />
          </View>

          { /** Arrow **/}
          <View style={styles.arrow}>
            <Image
              style={{ width: 25, height: 25, resizeMode: 'contain', tintColor: GREEN }}
              source={require('../assets/EditButton.png')}
            />
          </View>

        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

export default AlarmListing;
