import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { loadSoundPromise } from '../utilities';

import { OFFBLACK, OFFWHITETRANSPARENT } from '../styles';

const styles = StyleSheet.create({
  birdLabel: {
    width: 110,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: OFFWHITETRANSPARENT,
  },
  birdLabelText: {
    paddingTop: 5,
    paddingBottom: 5,
    width: 100,
    color: OFFBLACK,
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'SourceSerifPro-Light',
  },
  snoozeMessage: {
    position: 'relative',
    fontFamily: 'SourceSerifPro-Light',
    color: OFFBLACK,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

class AlarmBird extends Component {
  static propTypes = {
    navKey: PropTypes.string.isRequired,
    bird: PropTypes.object.isRequired,
    mirror: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    snoozed: PropTypes.bool.isRequired,
    selectable: PropTypes.bool,
    image: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
  }

  static birdRef;

  constructor(props) {
    super();
    this.soundObject = null;
    this.state = {
      singing: false,
      audible: false,
      timeoutID: null,
      alarmTimeoutId: null,
    };
  }

  componentDidMount() {
    if (!this.props.snoozed) {
      const alarmTimeoutId = setTimeout(() => {
        this.loadSong();
      }, (this.props.index * 10000));
      this.setState({
        alarmTimeoutId,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navKey !== 'ALARM_SCREEN') {
      this.stopSong();
    }
    // If the alarm is snoozed, bird should stop singing
    // any scheduled birds should also not sing
    if (nextProps.snoozed !== this.props.snoozed && nextProps.snoozed) {
      this.birdRef.shake(500);
      if (this.state.alarmTimeoutId) {
        clearTimeout(this.state.alarmTimeoutId);
      }
      this.stopSong();
    // If a snoozed alarm starts again, we have to reschedule the singing birds
    } else if (nextProps.snoozed !== this.props.snoozed && !nextProps.snoozed) {
      this.stopSong();
      const alarmTimeoutId = setTimeout(() => {
        if (this.soundObject && this.soundObject.isLoaded()) {
          this.playSong();
        } else {
          this.loadSong();
        }
      }, (this.props.index * 2500));

      this.setState({
        alarmTimeoutId,
      });
    }
  }

  componentWillUnmount() {
    this.unloadSong();
    if (this.state.alarmTimeoutId) {
      clearTimeout(this.state.alarmTimeoutId);
    }
  }

  async loadSong() {
    try {
      this.soundObject = await loadSoundPromise(this.props.bird.sound.filename);
      this.playSong();
    } catch (e) {
      console.log(`Could not load sound file ${this.props.bird.sound.filename}`);
    }
  }

  unloadSong() {
    if (this.soundObject) {
      this.stopSong();

      try {
        this.soundObject.release();
        this.soundObject = null;
      } catch (e) {
        console.log(e);
      }
    }
  }

  playSong() {
    if (this.soundObject && this.soundObject.isLoaded()) {
      this.soundObject.play((success) => {
        if (success) {
          // Loop Singing
          this.stopSong();
          this.playSong();
        } else {
          this.stopSong();
        }
      });

      // start the recursive timer function
      let timeoutID;

      const timerFunc = () => {
        if (this.state.songSectionIndex >=
            this.props.bird.sound.soundSections.length) {
          this.setState({
            audible: false,
            timeoutID: null,
          });
          return;
        }

        const soundSection = this.props.bird.sound.soundSections[this.state.songSectionIndex];
        const audible = (soundSection.type === 'song');
        const timeoutLength = soundSection.length;

        timeoutID = setTimeout(timerFunc, timeoutLength);

        this.setState({
          audible,
          timeoutID,
          songSectionIndex: this.state.songSectionIndex + 1,
        });
      };

      const soundSection = this.props.bird.sound.soundSections[0];
      const audible = (soundSection.type === 'song');
      const timeoutLength = soundSection.length;

      timeoutID = setTimeout(timerFunc, timeoutLength);

      this.setState({
        singing: true,
        audible,
        timeoutID,
        songSectionIndex: 1,
      });
    } else {
      this.loadSong();
    }
  }

  stopSong() {
    if (this.soundObject) {
      this.soundObject.stop();
      if (this.state.timeoutID) {
        clearTimeout(this.state.timeoutID);
      }
      this.setState({
        singing: false,
        audible: false,
        timeoutID: null,
      });
    }
  }

  render() {
    const { width, height } = Dimensions.get('window');

    let birdHeight = this.props.bird.alarmScreenConstants.iconHeight * width;
    let birdWidth = this.props.bird.alarmScreenConstants.iconWidth * width;

    birdHeight *= 0.9;
    birdWidth *= 0.9;

    let birdTop = this.props.position.top * height;
    birdTop -= (this.props.bird.alarmScreenConstants.perchPosition.top * birdHeight);
    let birdLeft = this.props.position.left * width;
    birdLeft -= (this.props.bird.alarmScreenConstants.perchPosition.left * birdWidth);
    let birdRight = this.props.position.left * width;
    birdRight -= ((1 - this.props.bird.alarmScreenConstants.perchPosition.left) * birdWidth);

    const haloSize = 50 * 0.9;
    const haloLeft = birdLeft + (this.props.bird.aboutScreenConstants.haloPosition.left * birdWidth);
    const haloRight = ((birdRight + birdWidth) - haloSize) - (this.props.bird.aboutScreenConstants.haloPosition.left * birdWidth);
    const haloTop = birdTop + (this.props.bird.aboutScreenConstants.haloPosition.top * birdHeight);

    return (
      <View>
        {this.state.audible &&
         <Image
           accessible={false}
           resizeMode={'contain'}
           style={[
             { position: 'absolute',
               width: haloSize,
               height: haloSize,
               top: haloTop,
             },
             this.props.mirror ? { left: haloLeft } : { left: haloRight },
           ]}
           source={require('../assets/halo.png')}
         />
        }
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={`${this.props.bird.name}. Alarm chorus bird.`}
          importantForAccessibility="no"
          activeOpacity={1}
          onPress={() => {
            this.props.onPress();
            this.stopSong();
            if (this.props.selectable && !this.props.selected) {
              this.playSong();
            }
          }}
          style={[
            {
              position: 'absolute',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              top: birdTop,
              height: birdHeight,
              width: birdWidth,
            },
            this.props.mirror ? { left: birdLeft } : {},
            !this.props.mirror ? { left: birdRight } : {},
          ]}
        >
          <Animatable.View
            pointerEvents={'none'}
            ref={(ref) => { this.birdRef = ref; }}
            style={{ flex: 1 }}
            accessible={false}
            importantForAccessibility="no-hide-descendants"
          >
            <Image
              resizeMode={'contain'}
              style={{ height: birdHeight, width: birdWidth }}
              source={this.props.mirror ?
                { uri: (this.props.image).iconMirrored } :
                { uri: (this.props.image).icon }}
            />
          </Animatable.View>
        </TouchableOpacity>
        {this.props.snoozed &&
          <Animatable.Text
            accessible={false}
            importantForAccessibility="no-hide-descendants"
            animation="fadeIn" iterationCount="infinite" direction="alternate"
            delay={this.props.index * 500}
            duration={2500}
            style={[styles.snoozeMessage,
              { position: 'absolute', top: haloTop, height: 20, width: 60 },
              this.props.mirror ?
                { left: haloLeft - 30 } :
                { left: haloRight + 20 },
            ]}
          >
            {this.props.mirror ? 'zzz...' : '...zzz' }
          </Animatable.Text>
        }
      </View>
    );
  }
}

export default AlarmBird;
