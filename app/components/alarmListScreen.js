import React, {
  PropTypes,
} from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  Platform,
  NativeModules,
  Modal,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import AlarmListing from './alarmListing';

import {
  NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED,
  NOTIFICATION_PERMISSIONS_STATUS_DENIED,
} from '../actions/notifications';

import { GREEN, RED, OFFWHITE, OFFBLACK, LIGHTGRAY, globalStyles } from './../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 15,
    paddingTop: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    ...Platform.select({
      android: {
        paddingTop: 10,
      },
      ios: {
        backgroundColor: OFFWHITE,
      },
    }),
  },
  messageBird: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 15,

    width: 120,
    height: 60,
    ...Platform.select({
      android: {
        bottom: 13,
      },
      ios: {
        bottom: -20,
      },
    }),
  },
  messageText: {
    flexDirection: 'column',
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginTop: 5,
    backgroundColor: OFFWHITE,
  },
  messageButtonText: {
    color: OFFBLACK,
    flex: 0.9,
  },
  instructionModal: {
    position: 'absolute',
    top: 25,
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 1,
    backgroundColor: LIGHTGRAY,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 1 },
    borderRadius: 3,
  },
  numberCircle: {
  },
  instruction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionGraphic: {
    resizeMode: 'contain',
    marginRight: 10,
    width: 150,
  },
  instructionTextContainer: {
    width: 170,
    marginRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  instructionText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    color: OFFBLACK,
    flexWrap: 'wrap',
    flexDirection: 'column',
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
});

const AlarmListScreen = (props) => {
  const { width, height } = Dimensions.get('window');

  let messageRef;
  let message;
  let messageButtonAccessibility;
  let messageButtonLabel;
  let messageButtonPress;

  let toSettingsMessage;

  let messageHeight;

  if (props.notificationPermission === NOTIFICATION_PERMISSIONS_STATUS_DENIED) {
    if (Platform.OS === 'android') {
      message = 'Oops! In order for your alarms to work please allow Dawn Chorus to send you notifications.';
      messageButtonLabel = 'Dawn Chorus settings';
      messageButtonAccessibility = 'Go to Dawn Chorus settings';
      messageButtonPress = () => {
        NativeModules.NotificationsPermissions.goToSettings();
      };
    }
    if (Platform.OS === 'ios') {
      message = 'You have not allowed Dawn Chorus to send you notifications! There are additional steps you must take in order to hear your alarms.';
      toSettingsMessage = (
        <View style={styles.messageText}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.messageButton, { marginBottom: 15 }]}
            onPress={() => { props.actions.toggleInstructionModal(true); }}
            accessibilityLabel={'Learn more.'}
          >
            <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
              Learn more
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              globalStyles.bodyText,
              { marginBottom: 5 },
            ]}
          >
            Or, allow notifications.
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.messageButton}
            onPress={() => {
              Linking.canOpenURL('app-settings:').then((supported) => {
                if (!supported) { return null; }
                return Linking.openURL('app-settings:');
              });
            }}
            accessibilityLabel={'Go to Dawn Chorus settings'}
          >
            <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
              Dawn Chorus settings
            </Text>
            <View style={styles.arrow}>
              <Image
                style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                source={require('../assets/RightFacingArrow.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      );

      messageHeight = 280;
    } else if (Platform.OS === 'android') {
      messageHeight = 180;
    }
  } else if (
    props.loaded &&
    props.alarms.length === 0 &&
    props.notificationPermission === NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED) {
    message = '';
    messageButtonLabel = 'Create an alarm';
    messageButtonAccessibility = 'Welcome! Tap to create your first alarm.';
    messageButtonPress = () => { props.actions.newAlarm(); };
    messageHeight = 130;
  } else if (props.silentSwitchOn) {
    message = 'Your silent switch is on. There are additional steps you must take in order to hear your alarms.';
    messageButtonAccessibility = 'Learn more';
    messageButtonLabel = 'Learn more';
    messageButtonPress = () => { props.actions.toggleInstructionModal(true); };
    messageHeight = 180;
  }

  return (
    <View
      importantForAccessibility="no"
      style={[styles.container, { marginTop: props.marginTop }]}
    >
      <Image
        resizeMode={'stretch'}
        style={[
          {
            position: 'absolute',
            height,
            width,
            opacity: 0.3,
          },
          Platform.OS === 'ios' ? { top: -64 } : { top: 0 },
        ]}
        source={require('../assets/Branches.png')}
      />

      <ScrollView
        importantForAccessibility="no"
        contentContainerStyle={[
          { padding: 5, paddingRight: 0 },
          messageHeight !== undefined ? { paddingTop: 25 } : {},
        ]}
        style={messageHeight !== undefined ? { marginTop: messageHeight } : {}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        { /** Alarm List **/}
        {props.loaded &&
         props.alarms.map((alarm, index) => {
           return (
             <AlarmListing
               key={alarm.uuid}
               index={index}
               total={props.alarms.length}
               alarm={alarm}
               disabled={props.notificationPermission === NOTIFICATION_PERMISSIONS_STATUS_DENIED && Platform.OS === 'android'}
               disabledOnPress={() => {
                 messageRef.shake(250);
               }}
               screenReader={props.screenReader}
               actions={{
                 saveAlarm: props.actions.saveAlarm,
                 deleteAlarm: props.actions.deleteAlarm,
                 setEditAlarm: props.actions.setEditAlarm,
                 setActiveAlarm: props.actions.setActiveAlarm,
               }}
             />
           );
         })}
      </ScrollView>

      { /** IOS Message **/}
      {message !== undefined &&
      Platform.OS === 'ios' &&
      <Animatable.View
        ref={(ref) => { messageRef = ref; }}
        style={[styles.message, { height: messageHeight }]}
      >
        <View
          style={[
            styles.messageText,
            message !== '' ? { marginTop: 10, marginBottom: 10 } : {},
          ]}
          accessible={message !== ''}
        >
          <View style={message !== '' ? { borderLeftWidth: 5, borderColor: RED, paddingLeft: 10, marginBottom: 5 } : {}}>
            <Text style={globalStyles.bodyText}>
              {message}
            </Text>
          </View>
          {messageButtonPress !== undefined &&
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.messageButton}
            onPress={messageButtonPress}
            accessibilityLabel={messageButtonAccessibility}
          >
            <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
              {messageButtonLabel}
            </Text>
            <View style={styles.arrow}>
              <Image
                style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                source={require('../assets/RightFacingArrow.png')}
              />
            </View>
          </TouchableOpacity>
          }
        </View>
        {toSettingsMessage !== undefined &&
          toSettingsMessage
        }
        <Image
          resizeMode={'stretch'}
          source={require('../assets/EditAlarmBottom.png')}
          style={{ position: 'absolute', bottom: -30, width, height: 30 }}
        />
        <Image
          style={styles.messageBird}
          source={require('../assets/BirdIcons_BlueJay.png')}
        />
      </Animatable.View>
      }

      { /** Android Message **/}
      {message !== undefined &&
      Platform.OS === 'android' &&

      <Animatable.View
        ref={(ref) => { messageRef = ref; }}
        style={[styles.message, { height: messageHeight + 30, paddingBottom: 30 }]}
        importantForAccessibility="no"
      >
        <View
          importantForAccessibility="no"
          style={[styles.message, { height: messageHeight, backgroundColor: OFFWHITE }]}
        >
          <View style={styles.messageText}>
            <Text
              style={[
                globalStyles.bodyText,
                message !== '' ? { marginTop: 10, marginBottom: 10 } : {},
              ]}
            >
              {message}
            </Text>
            {messageButtonPress !== undefined &&
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.messageButton}
              onPress={messageButtonPress}
              accessibilityLabel={messageButtonAccessibility}
            >
              <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
                {messageButtonLabel}
              </Text>
              <View style={styles.arrow}>
                <Image
                  style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                  source={require('../assets/RightFacingArrow.png')}
                />
              </View>
            </TouchableOpacity>
            }
          </View>
        </View>
        <Image
          importantForAccessibility="no"
          resizeMode={'stretch'}
          source={require('../assets/EditAlarmBottom.png')}
          style={{ position: 'absolute', bottom: 0, width, height: 30 }}
        />
        <Image
          importantForAccessibility="no"
          style={styles.messageBird}
          source={require('../assets/BirdIcons_BlueJay.png')}
        />
      </Animatable.View>
      }

      { /** Extra steps modal **/ }
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={props.instructionModal && Platform.OS === 'ios'}
        onRequestClose={() => { props.actions.toggleInstructionModal(false); }}
      >
        <View
          style={{
            backgroundColor: OFFBLACK,
            opacity: 0.4,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View style={styles.instructionModal}>
          <Image
            source={require('../assets/InstructionModalBackground.png')}
            style={[
              { resizeMode: 'cover', flex: 1, width: width - 20, borderRadius: 3 },
              height >= 667 ? { paddingBottom: 260, paddingTop: 60 } :
                              { paddingBottom: 200, paddingTop: 50 },
            ]}
          >
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.instructionText, { fontSize: 36, textAlign: 'right', color: GREEN, marginRight: 20, width: 50 }]}>
                 1.
                </Text>
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionText}>
                  {props.silentSwitchOn ?
                  'Turn volume up (notifications will still be silenced)' :
                  'Turn volume up'
                   }
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.instructionText, { fontSize: 36, textAlign: 'right', fontSize: 36, color: GREEN, marginRight: 20, width: 50 }]}>
                 2.
                </Text>
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionText}>
                 Connect to power
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.instructionText, { fontSize: 36, textAlign: 'right', fontSize: 36, color: GREEN, marginRight: 20, width: 50 }]}>
                 3.
                </Text>
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionText}>
                 Leave your phone unlocked and open to Dawn Chorus
                </Text>
              </View>
            </View>
          </Image>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              height: 56,
            }}
          >
            <TouchableOpacity
              style={{
                height: 56,
                width: 56,
                borderRadius: 28,
                paddingLeft: 15,
                paddingRight: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: GREEN,
              }}
              onPress={() => { props.actions.toggleInstructionModal(false); }}
            >
              <Image
                source={require('../assets/SaveButton.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      { /** Activity Indicator **/}
      {!props.loaded &&
        <View style={styles.loadingIndicator}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      }

    </View>
  );
};

AlarmListScreen.propTypes = {
  marginTop: PropTypes.number,
  alarms: PropTypes.arrayOf(PropTypes.object),
  screenReader: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  notificationPermission: PropTypes.string.isRequired,
  silentSwitchOn: PropTypes.bool.isRequired,
  instructionModal: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    navigatorPop: PropTypes.func.isRequired,
    navigatorPush: PropTypes.func.isRequired,
    newAlarm: PropTypes.func.isRequired,
    saveAlarm: PropTypes.func.isRequired,
    deleteAlarm: PropTypes.func.isRequired,
    setEditAlarm: PropTypes.func.isRequired,
    setActiveAlarm: PropTypes.func.isRequired,
    toggleInstructionModal: PropTypes.func.isRequired,
  }).isRequired,
};

export default AlarmListScreen;
