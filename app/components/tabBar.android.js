import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';

import { OFFBLACK, OFFBLACKTRANSPARENT, YELLOW } from './../styles.js';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
  },
  navTitleText: {
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro',
    fontSize: 20,
    textAlign: 'center',
  },
});

class TabBar extends Component {

  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
    scrollValue: React.PropTypes.object,
    containerWidth: React.PropTypes.number,
    visible: React.PropTypes.bool.isRequired,
  };

  renderTab(name, page, isTabActive, onPressHandler, visible) {
    if (visible) {
      const textColor = isTabActive ? OFFBLACK : OFFBLACKTRANSPARENT;
      const opacity = isTabActive ? 1 : 0.5;

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1 }}
          key={name}
          importantForAccessibility={visible ? 'yes' : 'no-hide-descendants'}
          accessible={true}
          accessibilityLabel={isTabActive ? `${name}. Selected.` : name}
          accessibilityTraits="button"
          onPress={() => onPressHandler(page)}
        >
          <View style={[styles.tab]}>
            <Text
              style={[
                { color: textColor, opacity },
                styles.navTitleText,
              ]}
            >
              {name}
            </Text>
          </View>
        </TouchableOpacity>);
    }

    return null;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 5,
      backgroundColor: YELLOW,
      bottom: 0,
    };

    const left = (this.props.scrollValue.position + this.props.scrollValue.offset) * (this.props.containerWidth / 2);

    return (
      <View
        importantForAccessibility="no"
        style={[styles.tabs, { backgroundColor: this.props.backgroundColor }]}
      >
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage, this.props.visible);
        })}
        <Animated.View
          importantForAccessibility="no"
          style={[tabUnderlineStyle, { left }, this.props.underlineStyle]}
        />
      </View>
    );
  }
}

export default TabBar;
