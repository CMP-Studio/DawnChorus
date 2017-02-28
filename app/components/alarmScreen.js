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
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';

import moment from 'moment';
import RNShakeEventIOS from 'react-native-shake-event';

import AlarmBird from './alarmBird';
import InfoCards from '../containers/infoCards';
import Fab from './fab';

import { getTimeStrings } from '../utilities';

import { OFFBLACK, GREEN, GRAY, OFFWHITE } from '../styles';

const styles = StyleSheet.create({
  time: {
    color: OFFBLACK,
    fontSize: 70,
    fontFamily: 'SourceSerifPro-Regular',
    backgroundColor: 'transparent',
    lineHeight: 75,
  },
  ampm: {
    color: OFFBLACK,
    fontSize: 36,
    backgroundColor: 'transparent',
  },
  timeDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    position: 'absolute',
    bottom: 125,
    left: 0,
    right: 0,
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
    infoCards: PropTypes.bool.isRequired,
    screenReader: PropTypes.bool.isRequired,
    alarm: PropTypes.object,
    actions: PropTypes.shape({
      showInfoCards: PropTypes.func.isRequired,
      snoozeAlarm: PropTypes.func.isRequired,
      stopAlarm: PropTypes.func.isRequired,
    }).isRequired,
  };

  static clockTimeoutID;
  static date;

  constructor() {
    super();
    this.handleShake = this.handleShake.bind(this);
  }

  componentWillMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      this.handleShake();
    });
  }

  componentWillUnmount() {
    clearInterval(this.clockTimeoutID);
    RNShakeEventIOS.removeEventListener('shake');
  }

  handleShake() {
    if (this.props.alarm !== null && !this.props.alarm.snoozed) {
      this.props.actions.snoozeAlarm(this.props.alarm.uuid);
    }
  }

  render() {
    const { width, height } = Dimensions.get('window');

    if (this.props.alarm === null) {
      return null;
    }

    /** Time Text **/
    this.date = moment();
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

    clearInterval(this.clockTimeoutID);
    this.clockTimeoutID = setInterval(() => {
      const checkDate = moment();
      if (checkDate.get('minute') !== this.date.get('minute')) {
        this.forceUpdate();
      }
    }, 1000);

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

    /** Snooze Text **/
    let snoozeMessage = '';

    if (this.props.alarm.snoozed) {
      const snoozeDate = moment(this.props.alarm.snoozeTime.actual);
      const minutesUntil = snoozeDate.diff(this.date, 'minutes') + 1;

      if (minutesUntil > 1) {
        snoozeMessage = `Snoozed. ${minutesUntil} minutes remaining.`;
      } else if (minutesUntil === 1) {
        snoozeMessage = 'Snoozed. 1 minute remaining.';
      } else {
        snoozeMessage = 'Snoozed.';
      }
    }

    /** Bird Positions **/
    const leftPositions = [0.73, 0.27, 0.55, 0.3, 0.73];
    const topPositions = [0.18, 0.21, 0.38, 0.52, 0.625];

    return (
      <View style={{ flex: 1 }}>
        <Image
          importantForAccessibility="no"
          accessible={false}
          resizeMode={'stretch'}
          source={require('../assets/AlarmBackground.png')}
          style={{ position: 'absolute', height, width, opacity: 1 }}
        />
        {!this.props.infoCards &&
         !this.props.screenReader &&
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
               this.props.actions.snoozeAlarm(this.props.alarm.uuid);
             }}
             image={require('../assets/SnoozeButton.png')}
             accessibilityLabel={'Snooze Alarm. Button.'}
             enabled={!this.props.alarm.snoozed}
             disabledImage={require('../assets/DisabledSnooze.png')}
           />
         </View>
        }
        {!this.props.infoCards &&
         !this.props.screenReader &&
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
               this.props.actions.stopAlarm(this.props.alarm.uuid);
             }}
             image={require('../assets/StopAlarmButton.png')}
             accessibilityLabel={'Stop Alarm. Button.'}
             enabled={true}
           />
         </View>
        }
        <View
          style={styles.timeDisplay}
          importantForAccessibility="yes"
          accessible={true}
          accessibilityLiveRegion="polite"
          accessibilityLabel={this.props.alarm.snoozed ?
            `The current time is ${hourString}:${minuteString} ${periodString}. ${snoozeMessage}` :
            `The current time is ${hourString}:${minuteString} ${periodString}. Shake to snooze.`
          }
        >
          { time }
          <Text style={styles.messageDisplay}>
            {this.props.alarm.snoozed ? snoozeMessage : 'Shake to snooze'}
          </Text>
        </View>
        <View
          style={
            !this.props.screenReader ? { position: 'absolute', top: 0 } : { paddingTop: 40 }
          }
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
                screenReader={this.props.screenReader}
                mirror={index % 2 === 0}
                navKey={this.props.navigatorKey}
                label={false}
                songButton={false}
                snoozed={this.props.alarm.snoozed}
                selected={true}
                image={bird.images}
                position={birdPosition}
                index={index}
                onPress={() => {
                  if (!this.props.alarm.snoozed) {
                    this.props.actions.snoozeAlarm(this.props.alarm.uuid);
                  }

                  this.props.actions.showInfoCards(bird, index);
                }}
              />
            );
          })}
        </View>
        {this.props.screenReader &&
          <View style={{ position: 'absolute', bottom: 0 }}>
            {!this.props.alarm.snoozed &&
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  {
                    height: 50,
                    marginBottom: 5,
                    width,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  this.props.alarm.snoozed ? { backgroundColor: GRAY } : { backgroundColor: GREEN },
                ]}
                onPress={() => {
                  if (!this.props.alarm.snoozed) {
                    this.props.actions.snoozeAlarm(this.props.alarm.uuid);
                  }
                }}
                accessible={!this.props.alarm.snoozed}
                accessibilityLabel={'Snooze Alarm. Button.'}
                accessibilityTraits={'header'}
              >
                <Text
                  style={{
                    color: OFFWHITE,
                    fontFamily: 'SourceSerifPro-Regular',
                    fontSize: 20,
                    backgroundColor: 'transparent',
                  }}
                >
                  Snooze
                </Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                { height: 50,
                  width,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: OFFBLACK,
                },
              ]}
              onPress={() => { this.props.actions.stopAlarm(this.props.alarm.uuid); }}
              accessibilityLabel={'Stop Alarm. Button.'}
              accessibilityTraits={'header'}
            >
              <Text
                style={{
                  color: OFFWHITE,
                  fontFamily: 'SourceSerifPro-Regular',
                  fontSize: 20,
                  backgroundColor: 'transparent',
                }}
              >
                Stop
              </Text>
            </TouchableOpacity>
          </View>
        }

        { /** Info Cards **/}
        {Platform.OS === 'ios' &&
          <Modal
            supportedOrientations={['portrait']}
            animationType={'slide'}
            transparent={true}
            visible={this.props.infoCards}
            onRequestClose={() => { console.log('Modal has been closed.'); }}
          >
            <InfoCards />
          </Modal>
        }
      </View>
    );
  }
}

export default AlarmScreen;
