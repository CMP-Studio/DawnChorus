import React, { Component, PropTypes } from 'react';

import {
  NavigationExperimental,
  Modal,
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';

import AboutBirds from '../containers/aboutBirds';
import AlarmList from '../containers/alarmList';
import EditAlarm from '../containers/editAlarm';
import Alarm from '../containers/alarm';
import InfoCards from '../containers/infoCards';

import {
  ABOUT_THE_BIRDS_SCREEN,
  ALARM_LIST_SCREEN,
  NEW_ALARM_SCREEN,
  EDIT_ALARM_SCREEN,
  ALARM_SCREEN,
  INFO_CARDS_SCREEN,
} from '../actions/navigator';

import {
  NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED,
} from '../actions/notifications';

import { OFFWHITE, OFFBLACK, OFFWHITETRANSPARENT, RED, DARKGREEN } from './../styles.js';

const {
  Transitioner: NavigationTransitioner,
  Card: NavigationCard,
  Header: NavigationHeader,
} = NavigationExperimental;

const styles = StyleSheet.create({
  cardStack: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBar: {
    backgroundColor: OFFWHITE,
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  navTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  navTitleText: {
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  navLeftButton: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
    backgroundColor: 'transparent',
  },
  navRightButton: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
    backgroundColor: 'transparent',
  },
  navButtonText: {
    color: DARKGREEN,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 17,
  },
  navButtonImage: {
    tintColor: DARKGREEN,
    width: 20,
    height: 20,
  },
  navCard: {
    backgroundColor: OFFWHITE,
    overflow: 'hidden',
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

class RootScreen extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    infoCards: PropTypes.bool.isRequired,
    notificationPermission: PropTypes.string.isRequired,
    activeAlarm: PropTypes.object,
    editAlarm: PropTypes.object,
    alarms: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
      navigatorPush: PropTypes.func.isRequired,
      navigatorPop: PropTypes.func.isRequired,
      newAlarm: PropTypes.func.isRequired,
      deleteAlarm: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.renderView = this.renderView.bind(this);
  }

  renderView({ scene }) {
    const { route } = scene;
    const { navigator } = this.props;
    const currentScene = navigator.routes[navigator.index].key;
    const accessible = route.key === currentScene;

    switch (route.key) {
      case ABOUT_THE_BIRDS_SCREEN: {
        return (<AboutBirds
          accessible={accessible}
        />);
      }

      case ALARM_LIST_SCREEN: {
        return (<AlarmList
          marginTop={64}
          accessible={accessible}
        />);
      }

      case NEW_ALARM_SCREEN: {
        return (<EditAlarm
          accessible={accessible}
        />);
      }

      case EDIT_ALARM_SCREEN: {
        return (<EditAlarm
          accessible={accessible}
        />);
      }

      default: return <View />;
    }
  }

  renderTitle(scene) {
    const { route } = scene;
    const { navigator } = this.props;
    const currentScene = navigator.routes[navigator.index].key;
    const accessible = route.key === currentScene;

    let title = '';

    switch (route.key) {
      case ABOUT_THE_BIRDS_SCREEN: {
        title = 'Birds';
        break;
      }

      case ALARM_LIST_SCREEN: {
        title = 'Alarms';
        break;
      }

      case NEW_ALARM_SCREEN: {
        title = 'New';
        break;
      }

      case EDIT_ALARM_SCREEN: {
        title = 'Edit';
        break;
      }

      default: break;
    }

    return (
      <View
        accessible={accessible}
        accessibilityLabel={title}
        accessibilityTraits={'header'}
        style={styles.navTitle}
      >
        <Text style={styles.navTitleText}>
          {title}
        </Text>
      </View>
    );
  }

  renderLeft(scene) {
    const { route } = scene;
    const { navigator } = this.props;
    const currentScene = navigator.routes[navigator.index].key;
    let accessible = false;

    let leftButton;
    let accessibilityLabel = '';
    let leftPress = () => {};

    switch (route.key) {
      case ABOUT_THE_BIRDS_SCREEN: break;

      case ALARM_LIST_SCREEN: {
        leftButton =
          (<Image
            style={[styles.navButtonImage, { height: 25, width: 36 }]}
            source={require('../assets/InformationButton.png')}
          />);

        leftPress = () => { this.props.actions.navigatorPop(); };
        accessible = route.key === currentScene;
        accessibilityLabel = 'About the Birds';
        break;
      }

      case NEW_ALARM_SCREEN:
      case EDIT_ALARM_SCREEN: {
        leftButton = <Text style={styles.navButtonText}>Cancel</Text>;
        leftPress = () => { this.props.actions.navigatorPop(); };
        accessible = route.key === currentScene;
        accessibilityLabel = 'Cancel';
        break;
      }

      default: break;
    }

    return (
      <TouchableOpacity
        style={styles.navLeftButton}
        onPress={leftPress}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={'button'}
      >
        {leftButton}
      </TouchableOpacity>
    );
  }

  renderRight(scene) {
    const { route } = scene;
    const { navigator, notificationPermission } = this.props;
    const currentScene = navigator.routes[navigator.index].key;
    let accessible = false;

    let rightButton;
    let accessibilityLabel = '';
    let accessibilityTraits;
    let rightPress = () => {};

    switch (route.key) {
      case ABOUT_THE_BIRDS_SCREEN: {
        rightButton = (<Text
          style={styles.navButtonText}
          accessible={route.key === currentScene}
        >
          Alarms
        </Text>);
        rightPress = () => {
          this.props.actions.navigatorPush(ALARM_LIST_SCREEN);
        };
        accessible = route.key === currentScene;
        accessibilityLabel = 'Go to Alarms';
        accessibilityTraits = 'button';
        break;
      }

      case ALARM_LIST_SCREEN: {
        const enabled = notificationPermission === NOTIFICATION_PERMISSIONS_STATUS_AUTHORIZED;

        rightButton = (
          <Text
            style={[styles.navButtonText,
              {
                fontSize: 40,
                opacity: enabled ? 1 : 0.5,
              },
            ]}
          >
            +
          </Text>
        );

        rightPress = enabled ? this.props.actions.newAlarm : null;
        accessible = route.key === currentScene;
        accessibilityLabel = 'New alarm.';
        accessibilityTraits = enabled ? 'button' : ['button', 'disabled'];
        break;
      }

      case NEW_ALARM_SCREEN: break;

      case EDIT_ALARM_SCREEN: {
        rightButton = (
          <Text style={[styles.navButtonText, { color: RED }]}>
            Delete
          </Text>
        );
        rightPress = () => {
          Alert.alert(
            'Delete Alarm',
            'Are you sure you want to delete this alarm?',
            [
              { text: 'Cancel', onPress: () => { console.log('Cancel'); }, style: 'cancel' },
              { text: 'Delete', onPress: () => this.props.actions.deleteAlarm(this.props.editAlarm.uuid), style: 'destructive' },
            ],
          );
        };
        accessible = route.key === currentScene;
        accessibilityLabel = 'Delete this alarm.';
        accessibilityTraits = ['button'];
        break;
      }

      default: break;
    }

    return (
      <TouchableOpacity
        style={styles.navRightButton}
        onPress={rightPress}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
      >
        {rightButton}
      </TouchableOpacity>
    );
  }

  render() {
    const sceneKey = this.props.navigator.routes[this.props.navigator.index].key;

    return (
      <View style={{ flex: 1 }}>

        { /** Screen **/}
        <NavigationTransitioner
          style={styles.cardStack}
          enableGestures={false}
          gestureResponseDistance={0}
          navigationState={this.props.navigator}
          render={props => (
            <View style={styles.navCard}>
              <NavigationHeader
                style={[
                  styles.navBar,
                  sceneKey === ABOUT_THE_BIRDS_SCREEN ?
                  { backgroundColor: OFFWHITETRANSPARENT } : {},
                ]}
                {...props}
                onNavigateBack={() => {}}
                renderLeftComponent={(leftProps) => {
                  return this.renderLeft(leftProps.scene);
                }}
                renderTitleComponent={(titleProps) => {
                  return this.renderTitle(titleProps.scene);
                }}
                renderRightComponent={(rightProps) => {
                  return this.renderRight(rightProps.scene);
                }}
              />
              <NavigationCard
                {...props}
                onNavigateBack={() => {}}
                renderScene={this.renderView}
                key={sceneKey}
                style={{ backgroundColor: OFFWHITE, overflow: 'hidden' }}
              />
            </View>
          )}
        />

        { /** Info Cards Modal **/}
        <Modal
          supportedOrientations={['portrait']}
          animationType={'slide'}
          transparent={true}
          visible={this.props.infoCards}
          onRequestClose={() => { console.log('Modal has been closed.'); }}
        >
          <View
            style={{
              backgroundColor: OFFWHITETRANSPARENT,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <InfoCards />
          </View>
        </Modal>

        { /** Alarm Modal **/}
        <Modal
          supportedOrientations={['portrait']}
          animationType={'slide'}
          transparent={true}
          visible={sceneKey === ALARM_SCREEN}
          onRequestClose={() => { console.log('Modal has been closed.'); }}
        >
          <View
            style={{
              backgroundColor: OFFWHITETRANSPARENT,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Alarm />
          </View>
        </Modal>
      </View>
    );
  }

}

export default RootScreen;
