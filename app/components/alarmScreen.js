import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import RNShakeEventIOS from 'react-native-shake-event'; // Despite name, includes android module
import SplashScreen from 'react-native-splash-screen'


import { getVolume, setVolume, getMaxVolume, onVolumeChange } from 'react-native-volume';

import AlarmBird from './alarmBird';
import Fab from './fab';

import { getTimeStrings, formatLabelLong } from '../utilities';

import { OFFBLACK, GREEN, GRAY, OFFWHITE } from '../styles';

const styles = StyleSheet.create({
  time: {
    color: OFFBLACK,
    fontSize: 48,
    fontFamily: 'SourceSerifPro-Regular',
    backgroundColor: 'transparent',
    lineHeight: 55,
  },
  ampm: {
    color: OFFBLACK,
    fontSize: 28,
    backgroundColor: 'transparent',
  },
  timeDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  labelDisplay: {
    color: OFFBLACK,
    fontSize: 20,
    fontFamily: 'SourceSerifPro-Light',
    backgroundColor: 'transparent',
    lineHeight: 26,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: GREEN,
  },
  messageDisplay: {
    color: OFFBLACK,
    fontSize: 20,
    fontFamily: 'SourceSerifPro-Light',
    backgroundColor: 'transparent',
    lineHeight: 26,
    marginBottom: 15,
  },
  actions: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

class AlarmScreen extends Component {
  static propTypes = {
    navigatorKey: PropTypes.string.isRequired,
    alarm: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      snoozeAlarm: PropTypes.func.isRequired,
      stopAlarm: PropTypes.func.isRequired,
    }).isRequired,
  };

  static clockTimeoutID;
  static date;
  static originalVolume;

  constructor() {
    super();
    // Shake to snooze
    this.handleShake = this.handleShake.bind(this);
  }

  componentWillMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      this.handleShake();
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.alarm.snoozed) {
      clearInterval(this.clockTimeoutID);
      setVolume(1);
    }
  }

  componentDidMount() {
    // Set volume
    getVolume().then((volume) => this.originalVolume = volume);
    // We want to start quiet and ramp it up!
    setVolume(1);
    SplashScreen.hide();
  }

  handleShake() {
    if (this.props.alarm !== null && !this.props.alarm.snoozed) {
      this.props.actions.snoozeAlarm(this.props.alarm);
    }
  }

  componentWillUnmount() {
    clearInterval(this.clockTimeoutID);
    RNShakeEventIOS.removeEventListener('shake');
  }


  render() {
    const { width, height } = Dimensions.get('window');
    if (this.props.alarm === null) { return null; }

    // Get current time for display
    this.date = moment();
    // Get the actual time to display
    const displayHour = this.date.get('hour');
    const displayMinute = this.date.get('minute');
    const {
      hourString,
      minuteString,
      periodString,
    } = getTimeStrings({
      hour: displayHour,
      minute: displayMinute,
    });
    const time = (
      <View>
        <Text style={styles.time}>
          {`${hourString}`}
          <Text style={[styles.ampm, { fontSize: 40, lineHeight: 75 }]}>:</Text>
          {`${minuteString}`}
          <Text style={styles.ampm}>
            {` ${periodString}`}
          </Text>
        </Text>
      </View>
    );

    if (this.clockTimeoutID !== null) { clearInterval(this.clockTimeoutID); }
    this.clockTimeoutID = setInterval(() => {
      const checkDate = moment();
      // Every 10 seconds, see if we should increase volume
      if (checkDate.get('second') % 5 === 0) {
        getVolume().then((volume) => { if (volume < (getMaxVolume() - 2)) { setVolume(volume + 1); }});
      }
      // If the minute has changed, re render display
      if (checkDate.get('minute') !== this.date.get('minute')) {
        this.forceUpdate();
      }
    }, 1000);

    /** Snooze Text **/
    let snoozeMessage = '';

    if (this.props.alarm.snoozed) {
      const snoozeTime = this.props.alarm.snoozeTime;
      const snoozeString = getTimeStrings({
        hour: snoozeTime.hour,
        minute: snoozeTime.minute,
      });

      const snoozeTimeString = `${snoozeString.hourString}:${snoozeString.minuteString}`;
      snoozeMessage = `Snoozed until ${snoozeTimeString} ${snoozeString.periodString}.`;
    }

    /** Bird Positions **/
    const leftPositions = [0.73, 0.27, 0.55, 0.3, 0.73];
    const topPositions = [0.18, 0.21, 0.38, 0.52, 0.625];


    let a11yLabel = `The current time is ${hourString}:${minuteString} ${periodString}. `

    if (this.props.alarm.label) {
      a11yLabel += `Alarm is labeled: ${this.props.alarm.label}. `;
    }

    if (this.props.alarm.snoozed) {
      a11yLabel += snoozeMessage;
    } else {
      a11yLabel += "Shake to snooze."
    }

    return (
      <View style={{ flex: 1 }}>
        <Image
          importantForAccessibility="no"
          accessible={false}
          resizeMode={'stretch'}
          source={require('../assets/AlarmBackground.png')}
          style={{ position: 'absolute', height, width, opacity: 1 }}
        />
         <View
           style={{
             position: 'absolute',
             bottom: 30,
             width: 60,
             height: 60,
             left: (width / 2) - 65,
           }}
         >
           <Fab
             position={{ position: 'absolute', top: 2, left: 2 }}
             color={OFFBLACK}
             onPress={() => {
               this.props.actions.snoozeAlarm(this.props.alarm);
             }}
             image={require('../assets/SnoozeButton.png')}
             accessibilityLabel={'Tap to Snooze Alarm.'}
             enabled={!this.props.alarm.snoozed}
             disabledImage={require('../assets/DisabledSnooze.png')}
           />
         </View>
         <View
           style={{
             position: 'absolute',
             bottom: 30,
             width: 60,
             height: 60,
             left: (width / 2) + 5,
           }}
         >
           <Fab
             position={{ position: 'absolute', top: 2, left: 2 }}
             color={OFFBLACK}
             onPress={() => {
                this.props.actions.stopAlarm(this.props.alarm);
             }}
             image={require('../assets/StopAlarmButton.png')}
             accessibilityLabel={'Tap to Stop Alarm.'}
             enabled={true}
           />
         </View>
        <View
          style={styles.timeDisplay}
          importantForAccessibility="yes"
          accessible={true}
          accessibilityLiveRegion="polite"
          accessibilityLabel={a11yLabel}
        >
          { time }
          { this.props.alarm.label != "" &&
            <Text style={[styles.labelDisplay, { marginBottom: 0 } ]}>
              {formatLabelLong(this.props.alarm.label)}
            </Text>
          }
          <Text style={[
            styles.messageDisplay,
            this.props.alarm.label ? { paddingTop: 10} : {}
            ]}>
            {this.props.alarm.snoozed ? snoozeMessage : 'Shake to snooze'}
          </Text>
        </View>
        <View
          style={{ position: 'absolute', top: 0 }}
        >
          {this.props.alarm.chorus.map((bird, index) => {
            const birdPosition = {
              left: leftPositions[index],
              top: topPositions[index],
            };

            return (
              <AlarmBird
                key={bird.uuid}
                bird={bird}
                mirror={index % 2 === 0}
                navKey={this.props.navigatorKey}
                label={false}
                songButton={false}
                snoozed={this.props.alarm.snoozed}
                selected={true}
                image={bird.images}
                position={birdPosition}
                index={index}
                importantForAccessibility="no"
                onPress={() => {
                  if (!this.props.alarm.snoozed) {
                    this.props.actions.snoozeAlarm(this.props.alarm);
                  }
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default AlarmScreen;
