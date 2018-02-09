import React, {
  PropTypes,
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { OFFWHITE, DARKGREEN, OFFBLACK } from './../styles.js';

const styles = StyleSheet.create({
  navTitleText: {
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro',
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'left',
  },
  navBar: {
    backgroundColor: OFFWHITE,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navTitle: {
    margin: 0,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  navLeftButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
    width: 72,
  },
  navRightButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  navButtonText: {
    color: DARKGREEN,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 20,
    lineHeight: 20,
  },
  navButtonImage: {
    tintColor: DARKGREEN,
    width: 20,
    height: 20,
  },
});

const NavBar = (props) => {
  return (
    <View style={styles.navBar}>
      {props.leftButton &&
        <TouchableOpacity
          onPress={props.leftPress}
          style={styles.navLeftButton}
          accessibilityLabel={'Tap to cancel edits to this alarm.'}
        >
          {props.leftButton}
        </TouchableOpacity>
      }
      <View
        style={styles.navTitle}
        accessibilityLiveRegion="polite"
      >
        <Text style={styles.navTitleText}>
          {props.navTitle}
        </Text>
      </View>
      {props.rightButton &&
        <TouchableOpacity
          onPress={props.rightPress}
          style={styles.navRightButton}
          accessibilityLabel={'Tap to delete this alarm.'}
        >
          {props.rightButton}
        </TouchableOpacity>
      }
    </View>
  );
};

NavBar.propTypes = {
  navTitle: PropTypes.string,
  leftButton: PropTypes.object,
  leftPress: PropTypes.func,
  rightButton: PropTypes.object,
  rightPress: PropTypes.func,
};

export default NavBar;
