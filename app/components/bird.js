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
  Text,
} from 'react-native';

import RNShakeEventIOS from 'react-native-shake-event';
import * as Animatable from 'react-native-animatable';

import { loadSoundPromise } from '../utilities';

import {
  OFFBLACK,
  OFFWHITE,
  OFFWHITETRANSPARENT,
  OFFBLACKTRANSPARENT,
  globalStyles,
} from '../styles';

const styles = StyleSheet.create({
  birdLabel: {
    width: 120,
    height: 49,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: OFFWHITETRANSPARENT,
  },
  birdLabelText: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    width: 110,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'SourceSerifPro-Light',
    fontSize: 14,
  },
});

class Bird extends Component {
  static propTypes = {
    navKey: PropTypes.string.isRequired,
    screenReader: PropTypes.bool.isRequired,
    bird: PropTypes.object.isRequired,
    mirror: PropTypes.bool.isRequired,
    label: PropTypes.bool,
    songButton: PropTypes.bool,
    sampling: PropTypes.bool,
    selected: PropTypes.bool,
    selectable: PropTypes.bool,
    image: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    toggleSampleChorus: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    topOffset: PropTypes.number.isRequired,
  }

  static birdRef;

  constructor(props) {
    super();

    this.state = {
      soundObject: null,
      singing: false,
      audible: false,
      timeoutID: null,
      sampleTimeoutID: null,
    };
  }

  componentWillMount() {
    RNShakeEventIOS.addEventListener('shake', () => {
      if (this.props.sampling) {
        this.birdRef.shake(500);
        this.props.toggleSampleChorus(false);
      } else if (this.state.singing) {
        this.birdRef.shake(500);
        this.stopSong();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // If we switch screens, bird should stop singing
    if (nextProps.navKey !== this.props.navKey) {
      this.stopSong();
    }
    // If the bird is removed from chorus, then it should stop singing
    if (nextProps.selected !== this.props.selected &&
        !nextProps.selected) {
      this.stopSong();
    }
    if (nextProps.sampling !== this.props.sampling) {
      this.stopSong();
      if (nextProps.sampling && this.props.selected) {
        this.playSong();
      }
    }
    if (this.stoppedSample) {
      this.playSong();
      this.stoppedSample = false;
    }
  }

  componentWillUnmount() {
    RNShakeEventIOS.removeEventListener('shake');
    this.unloadSong();
  }

  async loadSong() {
    try {
      this.state.soundObject = await loadSoundPromise(this.props.bird.sound.filename);
      this.playSong();
    } catch (e) {
      console.log(`Could not load sound file ${this.props.bird.sound.filename}`);
    }
  }

  async unloadSong() {
    this.stopSong();
    if (this.state.sampleTimeoutID !== null) {
      clearTimeout(this.state.sampleTimeoutID);
    }
    if (this.state.soundObject !== null &&
        this.state.soundObject.isLoaded()) {
      try {
        this.state.soundObject.release();
        this.setState({
          soundObject: null,
        });
      } catch (e) {
        this.stopSong();
      }
    }
  }

  onSongEnd(success) {
    if (success) {
      this.setState({
        timeoutID: null,
      });
      if (this.props.sampling) {
        // Slight delay, then play song again
        const sampleTimeoutID = setTimeout(() => {
          this.playSong();
          this.setState({ sampleTimeoutID: null });
        }, 500);
        this.setState({ sampleTimeoutID });
      } else {
        this.stopSong();
      }
    } else {
      this.setState({
        singing: false,
        audible: false,
        timeoutID: null,
        sampleTimeoutID: null,
      });
    }
  }

  playSong() {
    if (this.state.soundObject !== null &&
        this.state.soundObject.isLoaded()
      ) {
      this.state.soundObject.play((success) => {
        this.onSongEnd(success);
      });

      // start the recursive timer function
      let timeoutID;

      const timerFunc = () => {
        if (this.state.songSectionIndex >=
            this.props.bird.sound.soundSections.length) {
          if (!this.props.sampling) {
            this.stopSong();
          } else {
            this.setState({
              songSectionIndex: 0,
              audible: false,
            });
          }
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
    if (this.state.sampleTimeoutID) {
      clearTimeout(this.state.sampleTimeoutID);
      this.setState({
        sampleTimeoutID: null,
      });
    }
    if (this.state.soundObject !== null &&
        this.state.soundObject.isLoaded()) {
      this.state.soundObject.stop();
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

  stoppedSample = false;

  render() {
    const { width, height } = Dimensions.get('window');

    const birdHeight = this.props.bird.aboutScreenConstants.iconHeight * width;
    const birdWidth = this.props.bird.aboutScreenConstants.iconWidth * width;
    const birdTop = this.props.position.top * height;
    const birdLeft = this.props.position.left * width;

    const labelWidth = (this.props.songButton ? 160 : 120);
    const labelTop = (birdTop + birdHeight) - this.props.bird.aboutScreenConstants.labelPosition.bottom;
    const labelLeft = birdLeft - ((labelWidth - birdWidth) / 2);

    const haloSize = 50;
    const haloLeft = birdLeft + (this.props.bird.aboutScreenConstants.haloPosition.left * birdWidth);
    const haloRight = ((birdLeft + birdWidth) - haloSize) - (this.props.bird.aboutScreenConstants.haloPosition.left * birdWidth);
    const haloTop = birdTop + (this.props.bird.aboutScreenConstants.haloPosition.top * birdHeight);

    let birdAccessibilityLabel = this.props.bird.name;

    if (this.props.navKey === 'ABOUT_THE_BIRDS_SCREEN') {
      birdAccessibilityLabel = `${this.props.bird.name}. Tap for more info.`;
    } else if ((this.props.navKey === 'NEW_ALARM_SCREEN' && this.props.selected) ||
               (this.props.navKey === 'EDIT_ALARM_SCREEN' && this.props.selected)) {
      birdAccessibilityLabel = `${this.props.bird.name}. Selected. Tap to remove from chorus.`;
    } else if ((this.props.navKey === 'NEW_ALARM_SCREEN' && this.props.selectable) ||
               (this.props.navKey === 'EDIT_ALARM_SCREEN' && this.props.selectable)) {
      birdAccessibilityLabel = `${this.props.bird.name}. Tap to add to chorus.`;
    } else if ((this.props.navKey === 'NEW_ALARM_SCREEN' && !this.props.selectable) ||
               (this.props.navKey === 'EDIT_ALARM_SCREEN' && !this.props.selectable)) {
      birdAccessibilityLabel = `${this.props.bird.name}. No room in your chorus.`;
    }

    return (
      <View
        style={[
          this.props.screenReader ? {
            width,
            paddingLeft: 40,
            paddingRight: 40,
          } : {},
          (this.props.screenReader && this.props.index % 2 === 1) ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },
        ]}
      >
        { /* HALO */ }
        { this.state.audible &&
          !this.props.screenReader &&
          <Image
            accessible={false}
            importantForAccessibility="no"
            resizeMode={'contain'}
            style={[
              { position: 'absolute',
                width: haloSize,
                height: haloSize,
                top: haloTop + this.props.topOffset,
              },
              this.props.mirror ? { left: haloLeft } : { left: haloRight },
            ]}
            source={require('../assets/halo.png')}
          />
        }
        { /* BIRD */ }
        <TouchableOpacity
          accessible={false}
          importantForAccessibility="no"
          activeOpacity={0.8}
          style={[
            this.props.screenReader ?
            {
              height: (height / 5.1) - 49,
            } :
            {
              position: 'absolute',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              top: birdTop + this.props.topOffset,
              left: birdLeft,
              height: birdHeight,
              width: birdWidth,
            },
          ]}
          onPress={() => {
            this.props.onPress();
            this.stopSong();
            if (this.props.selectable && !this.props.selected) {
              this.playSong();
            }
          }}
        >
          <Animatable.View
            pointerEvents={'none'}
            ref={(ref) => { this.birdRef = ref; }}
            style={{ flex: 1 }}
          >
            <Image
              resizeMode={'contain'}
              style={[
                {
                  height: birdHeight,
                  width: birdWidth,
                },
                !this.props.selected ? { tintColor: OFFBLACKTRANSPARENT } : {},
              ]}
              source={this.props.mirror ?
                { uri: (this.props.image).iconMirrored } :
                { uri: (this.props.image).icon }}
            />
          </Animatable.View>
        </TouchableOpacity>
        { /* LABEL */ }
        {this.props.label &&
          <TouchableOpacity
            accessibilityLabel={birdAccessibilityLabel}
            accessibilityTraits={['startsMedia']}
            importantForAccessibility="yes"
            activeOpacity={0.7}
            onPress={() => {
              this.props.onPress();
              this.stopSong();
              if (this.props.selectable && !this.props.selected) {
                this.playSong();
              }
            }}
            style={[
              styles.birdLabel,
              this.props.screenReader ?
              {
                width: labelWidth,
              }
              : {
                position: 'absolute',
                top: labelTop + this.props.topOffset,
                left: labelLeft,
                width: labelWidth,
              },
              this.props.songButton ? {
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
              } : {},
            ]}
          >
            {this.props.songButton &&
              <TouchableOpacity
                activeOpacity={0.7}
                importantForAccessibility="no"
                accessible={false}
                onPress={() => {
                  if (this.props.sampling) {
                    this.stoppedSample = true;
                    this.props.toggleSampleChorus(false);
                  }
                  else if (!this.state.singing) this.playSong();
                  else if (this.state.singing) this.stopSong();
                }}
                style={{ padding: 3 }}
              >
                <View
                  style={[
                    { elevation: 2, borderRadius: 20 },
                    this.state.singing && !this.props.sampling ? { backgroundColor: OFFBLACK } :
                                                                 { backgroundColor: OFFWHITE },
                  ]}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    resizeMode={'contain'}
                    source={this.state.singing && !this.props.sampling ? require('../assets/StopButton.png') : require('../assets/PlayButton.png')}
                  />
                </View>
              </TouchableOpacity>
            }
            <Text
              accessible={false}
              style={[globalStyles.bodyText, styles.birdLabelText]}
            >
              {this.props.bird.name}
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default Bird;
