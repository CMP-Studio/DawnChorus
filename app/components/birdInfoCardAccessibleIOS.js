import React, {
  PropTypes,
  Component,
} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { loadSoundPromise } from '../utilities';

import { OFFBLACK, OFFWHITE, LIGHTGRAY, globalStyles } from '../styles';

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    flex: 1,
  },
  card: {
    backgroundColor: OFFWHITE,
    borderWidth: 0,
    flex: 1,
    marginLeft: 5,
    marginTop: 10,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { x: 0, y: 1 },
  },
  birdImage: {
    height: 200,
    marginBottom: 15,
    borderRadius: 3,
  },
  birdName: {
    textAlign: 'center',
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 20,
  },
  birdLatinName: {
    textAlign: 'center',
    color: OFFBLACK,
    fontStyle: 'italic',
    fontSize: 15,
    marginBottom: 15,
  },
  flipButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 7,
  },
  flipButtonText: {
    color: OFFBLACK,
    flex: 1,
  },
  arrow: {
    width: 15,
    alignItems: 'flex-end',
  },
  playSongButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
});

class BirdInfoCardAccessibleIOS extends Component {
  static propTypes = {
    bird: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.state = {
      singing: false,
      flip: true,
      timeout: null,
    };
  }

  componentWillUnmount() {
    this.unloadSong();
  }

  async loadSong() {
    try {
      this.soundObject = await loadSoundPromise(this.props.bird.sound.filename);
    } catch (e) {
      this.playSong();
    }
    this.playSong();
  }

  async unloadSong() {
    if (this.soundObject !== undefined) {
      this.stopSong();
      try {
        this.soundObject.release();
      } catch (e) {
        console.log(e);
      }
    }
  }

  playSong() {
    if (this.soundObject.isLoaded()) {
      this.soundObject.play((success) => {
        if (success) {
          console.log('finished playback');
          this.stopSong();
        } else {
          console.log('playback failed due to audio decoding errors');
          this.stopSong();
        }
      });

      // stop song after first 'song' section
      const timerFunc = () => {
        this.stopSong();
        return;
      };

      const timeoutLength = this.props.bird.sound.chirpLength;

      this.setState({
        timeout: setTimeout(timerFunc, timeoutLength),
        singing: true,
        songSectionIndex: 1,
      });
    }
  }

  stopSong() {
    if (this.soundObject !== undefined) {
      this.soundObject.stop();
      clearTimeout(this.state.timeout);
      this.setState({
        singing: false,
        timeout: null,
      });
    }
  }

  render() {
    const cardWidth = this.props.width;

    return (
      <View
        style={[
          styles.cardContainer,
          { width: cardWidth, padding: 5 },
        ]}
      >
        <View
          style={styles.card}
        >
          <ScrollView
            style={{ backgroundColor: OFFWHITE, marginTop: 15, marginBottom: 5 }}
            contentContainerStyle={{ padding: 15, paddingTop: 0, paddingBottom: 10 }}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <View
              style={{ backgroundColor: OFFWHITE }}
            >
              <Text
                style={styles.birdName}
                accessible={true}
              >
                {(this.props.bird.name).toUpperCase()}
              </Text>
              <Text
                style={styles.birdLatinName}
                importantForAccessibility="yes"
                accessibilityLabel={`Latin Name: ${this.props.bird.latinName}.`}
                accessible={true}
              >
                {this.props.bird.latinName}
              </Text>
            </View>
            { /** Bird Picture and Song Button **/ }
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={'Tap to hear song.'}
              accessibilityTraits={'startsMedia'}
              activeOpacity={1}
              onPress={() => {
                if (this.state.singing === false) {
                  if (this.state.loaded) {
                    this.playSong();
                  } else {
                    this.loadSong();
                  }
                } else {
                  this.stopSong();
                }
              }}
              style={[
                styles.birdImage,
              ]}
            >
              <Image
                resizeMode={'cover'}
                style={{ width: cardWidth - 50, height: 200, borderRadius: 3 }}
                source={{ uri: this.props.bird.images.infoCard }}
              />
              <View
                style={[
                  { elevation: 2, borderRadius: 20 },
                  this.state.singing ? { backgroundColor: OFFBLACK } :
                                       { backgroundColor: OFFWHITE },
                  styles.playSongButton,
                ]}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  resizeMode={'contain'}
                  source={this.state.singing ? require('../assets/StopButton.png') : require('../assets/PlayButton.png')}
                />
              </View>
            </TouchableOpacity>
            { /** Bird Text **/ }
            <View
              style={{ backgroundColor: OFFWHITE }}
            >
              <Text
                style={[globalStyles.bodyText, { marginBottom: 15 }]}
                importantForAccessibility="yes"
                accessibilityLabel={this.props.bird.text}
                accessible={true}
              >
                {this.props.bird.text}
              </Text>
            </View>
            <View
              style={{ backgroundColor: OFFWHITE }}
              accessible={true}
            >
              <Text style={[globalStyles.bodyText, { marginBottom: 15 }]}>
                {this.props.bird.group === 'CMNH' &&
                  'Researchers at Carnegie Museum of Natural History have studied this bird.'
                }
                {this.props.bird.group === 'Powdermill' &&
                  'This species of bird is often banded at Powdermill Nature Reserve.'
                }
                {this.props.bird.group === 'BirdSafe' &&
                  'This species is heavily affected by window collisions, which BirdSafe Pittsburgh is working to prevent.'
                }
              </Text>
            </View>
            { /** Back Text **/ }
            <View accessible={true}>
              <Text
                style={[styles.birdName, { marginBottom: 15, paddingLeft: 15, paddingRight: 15 }]}
              >
                {this.props.bird.group === 'CMNH' &&
                  'CARNEGIE MUSEUM OF NATURAL HISTORY'
                }
                {this.props.bird.group === 'Powdermill' &&
                  'POWDERMILL AVIAN RESEARCH CENTER'
                }
                {this.props.bird.group === 'BirdSafe' &&
                  'BIRDSAFE PITTSBURGH'
                }
              </Text>
            </View>
            <View
              style={{ backgroundColor: OFFWHITE }}
              accessible={false}
            >
              {this.props.bird.group === 'CMNH' &&
                <Image
                  resizeMode={'cover'}
                  style={[{ width: cardWidth - 50, height: 200 }, styles.birdImage]}
                  source={require('../assets/cmnh.jpg')}
                />
              }
              {this.props.bird.group === 'Powdermill' &&
                <Image
                  resizeMode={'cover'}
                  style={[{ width: cardWidth - 50, height: 200 }, styles.birdImage]}
                  source={require('../assets/powdermill.jpg')}
                />
              }
              {this.props.bird.group === 'BirdSafe' &&
                <Image
                  resizeMode={'cover'}
                  style={[{ width: cardWidth - 50, height: 200 }, styles.birdImage]}
                  source={require('../assets/birdsafe.jpg')}
                />
              }
              <View accessible={true}>
                <Text style={[globalStyles.bodyText, { marginBottom: 15 }]}>
                  {this.props.bird.group === 'CMNH' &&
                    'Scientists at Carnegie Museum of Natural History, located in Pittsburgh Pennsylvania, have been involved in many groundbreaking avian research projects.  The museum’s first curator of birds, W. E. Clyde Todd, published seminal works on the birdlife of Pennsylvania (1940) and the Labrador Peninsula (1963), which he and museum artist and scientist George Miksch Sutton studied for decades.  Kenneth C. Parkes, curator of birds from the 1950s through the 1990s, was an internationally recognized authority on avian taxonomy, molt terminology and sequence, and avian hybridization.'
                  }
                  {this.props.bird.group === 'Powdermill' &&
                    'Powdermill Nature Reserve, Carnegie Museum of Natural History’s research facility in Rector Pennsylvania, is home to the museum’s avian research center.  With the United States longest running year-round bird-banding station as its hub, Powdermill scientists research many different aspects of avian ecology.  Decades of research on the breeding behaviour of the Louisiana Waterthrush, begun in 1996 by ornithologist Robert S. Mulvihill, have led to a clearer understanding of the impacts of pollution on songbird populations. Other research has led to a better understanding of how invasive species can negatively affect breeding success by changing the coloration of avian plumage.  Current research scientist Luke DeGroote is focusing on the stopover ecology of songbirds and how climate change may impact migratory behavior and timing in songbirds.  Powdermill also hosts the only flight tunnel where bird friendly patterned glass prototypes are tested, safely using the birds caught and banded at the center’s bird banding laboratory.'
                  }
                  {this.props.bird.group === 'BirdSafe' &&
                    'BirdSafe Pittsburgh is a local partnership that engages volunteer citizen scientists in researching the issue of birds colliding with windows. Window collisions are one of the leading causes of human-induced avian mortality, with estimates of up to 1 billion birds dying each year in the United States alone. Volunteers search around buildings throughout Pittsburgh to find and document birds that have collided with windows. Citizen scientists also monitor their homes in order to learn more about window collisions on residential buildings. Dead birds are brought back to Carnegie Museum of Natural History to become part of the collection. Live birds are safely captured and taken to the Animal Rescue League wildlife center to be rehabilitated and released.'
                  }
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default BirdInfoCardAccessibleIOS;
