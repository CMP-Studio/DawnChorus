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
  Text,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import AlarmListing from './alarmListing';

import { GREEN, RED, OFFWHITE, OFFBLACK, LIGHTGRAY, globalStyles } from './../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 28,
  },
  messageBird: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    width: 300,
    top: 120,
    height: 140,
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
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 28,
    marginTop: 15,
    elevation: 2,
    height: 56,
    backgroundColor: GREEN,
  },
  messageButtonText: {
    color: OFFWHITE,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

const AlarmListScreen = (props) => {
  const { width, height } = Dimensions.get('window');

  let messageRef;
  let message;
  let messageButtonAccessibility;
  let messageButtonLabel;
  let messageButtonPress;
  let messageHeight;

  if (props.loaded && props.alarms.length === 0) {
    message = '';
    messageButtonLabel = 'CREATE AN ALARM';
    messageButtonAccessibility = 'Welcome! Tap to create your first alarm.';
    messageButtonPress = () => { props.actions.newAlarm(); };
    messageHeight = 155;
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
            top: -45,
          },
        ]}
        source={require('../assets/AlarmListBranches.png')}
      />

      <ScrollView
        importantForAccessibility="no"
        contentContainerStyle={[
          { padding: 5, paddingRight: 0, paddingBottom: 100, paddingTop: 15 },
          messageHeight !== undefined ? { paddingTop: 25 } : {},
        ]}
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

      { /** Android Message **/}
      {message !== undefined &&
      <Animatable.View
        ref={(ref) => { messageRef = ref; }}
        style={[styles.message, { height }]}
        importantForAccessibility="no"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.messageButton}
          onPress={messageButtonPress}
          accessibilityLabel={messageButtonAccessibility}
        >
          <Text style={[styles.messageButtonText]}>
            {messageButtonLabel}
          </Text>
        </TouchableOpacity>
        <Image
          importantForAccessibility="no"
          style={styles.messageBird}
          source={require('../assets/SittingWarbler.png')}
        />
      </Animatable.View>
      }

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
  loaded: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    navigatorPop: PropTypes.func.isRequired,
    navigatorPush: PropTypes.func.isRequired,
    newAlarm: PropTypes.func.isRequired,
    saveAlarm: PropTypes.func.isRequired,
    deleteAlarm: PropTypes.func.isRequired,
    setEditAlarm: PropTypes.func.isRequired,
    setActiveAlarm: PropTypes.func.isRequired,
  }).isRequired,
};

export default AlarmListScreen;
