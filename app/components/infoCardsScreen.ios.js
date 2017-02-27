import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import BirdInfoCard from './birdInfoCard';
import BirdInfoCardAccessibleIOS from './birdInfoCardAccessibleIOS';
import Fab from './fab';

import { OFFBLACK, OFFWHITE } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  swiper: {
    flex: 1,
  },
  swiperButtonText: {
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 32,
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
    screenReader: PropTypes.bool.isRequired,
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
      <View style={[styles.container, { width: this.width }]}>
        { /** Info Cards **/}
        {this.props.screenReader &&
          <BirdInfoCardAccessibleIOS
            width={width}
            bird={this.chorus[this.props.currentCard.index]}
            currentCard={this.props.currentCard}
          />
        }
        {!this.props.screenReader &&
          <ScrollView
            ref={(scroll) => { this.scrollView = scroll; }}
            horizontal={true}
            pagingEnabled={true}
            directionalLockEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={this.props.screenReader ? {} : { overflow: 'visible' }}
            contentOffset={
              this.props.screenReader ?
              { x: this.props.currentCard.index * (width), y: 0 } :
              { x: this.props.currentCard.index * (width * 0.86), y: 0 }
            }
            style={[styles.swiper,
              this.props.screenReader ? { width } :
              {
                width: width * 0.86,
                overflow: 'visible',
                position: 'relative',
                left: width * 0.07,
              },
            ]}
          >
            {this.chorus.map((bird, index) => {
              return (
                <View
                  key={bird.uuid}
                  style={{ width: width * 0.86, alignItems: 'center' }}
                >
                  <BirdInfoCard
                    width={width * 0.86}
                    bird={bird}
                    currentCard={this.props.currentCard}
                    index={index}
                  />
                </View>
              );
            })}
          </ScrollView>
        }

        {this.props.screenReader &&
          <TouchableOpacity
            style={[
              { height: 50,
                width,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: OFFBLACK,
              },
            ]}
            onPress={() => { this.props.actions.closeInfoCards(); }}
            accessible={true}
            accessibilityLabel={'Close Info Card. Button.'}
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
              Close
            </Text>
          </TouchableOpacity>
        }

        {!this.props.screenReader &&
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
        }
      </View>
    );
  }
}

export default InfoCardsScreen;
