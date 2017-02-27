import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  ViewPagerAndroid,
} from 'react-native';

import BirdInfoCard from './birdInfoCard';
import Fab from './fab';

import { OFFBLACK } from './../styles.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  dismissContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    left: 0,
    right: 0,
  },
});

class InfoCardsScreen extends Component {

  static propTypes = {
    birds: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentCard: PropTypes.object.isRequired,
    alarmChorus: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.shape({
      closeInfoCards: PropTypes.func.isRequired,
    }).isRequired,
  };

  static chorus;
  static index;
  static scrollView;
  static width;
  static currentIndex;

  componentWillMount() {
    this.chorus = this.props.birds;
    if (this.props.alarmChorus !== null) {
      this.chorus = this.props.alarmChorus;
    }
    this.setState({ currentIndex: this.props.currentCard.index });
  }

  render() {
    const { width } = Dimensions.get('window');
    this.width = width;

    return (
      <View
        style={[styles.container, { width: this.width }]}
        importantForAccessibility="yes"
        accessibilityLiveRegion="polite"
        accessibilityLabel={'Bird information cards.'}
      >
        { /** Info Cards **/}
        <ViewPagerAndroid
          initialPage={this.props.currentCard.index}
          style={[styles.swiper]}
          importantForAccessibility="yes"
        >
          {this.chorus.map((bird, index) => {
            return (
              <View
                importantForAccessibility="no"
                key={bird.uuid}
                style={{ width, alignItems: 'center' }}
              >
                <BirdInfoCard
                  importantForAccessibility="no"
                  width={width * 0.9}
                  bird={bird}
                  currentCard={this.props.currentCard}
                  index={index}
                />
              </View>
            );
          })}
        </ViewPagerAndroid>
        { /** Dismiss Cards Button **/}
        <View style={[styles.dismissContainer, { width }]}>
          <Fab
            color={OFFBLACK}
            onPress={() => { this.props.actions.closeInfoCards(); }}
            image={require('../assets/DismissButton.png')}
            accessibilityLabel={'Close Info Cards. Button.'}
            visible={true}
            enabled={true}
          />
        </View>
      </View>
    );
  }
}

export default InfoCardsScreen;
