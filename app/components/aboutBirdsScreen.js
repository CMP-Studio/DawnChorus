import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';

import Bird from './bird';

import { OFFBLACK, OFFWHITE, LIGHTGRAY, globalStyles } from '../styles.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFFWHITE,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  credits: {
    position: 'absolute',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  },
  navTitleText: {
    color: OFFBLACK,
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 30,
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
  creditText: {
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  urlButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: LIGHTGRAY,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginTop: 5,
  },
  urlButtonText: {
    color: OFFBLACK,
    flex: 0.9,
  },
  arrow: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  link: {
    marginBottom: 30,
  },
});

const AboutBirdsScreen = (props) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View
      style={[
        styles.container,
        props.screenReader ? { marginTop: 64 } : {},
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          Platform.OS === 'ios' ? { height: (height * 5.2) - 64 } : { height: (height * 5.1) - 94 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        { /** Scroll Background **/}
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: -height, height, width }}
          source={require('../assets/ScrollEdges.png')}
        />
        <Image
          resizeMode={'stretch'}
          style={[
            { position: 'absolute', top: 0, height, width },
            Platform.OS === 'android' ? { top: -45 } : {},
          ]}
          source={require('../assets/Branches.png')}
        />
        <Image
          resizeMode={'stretch'}
          style={[
            { position: 'absolute', top: height, height, width },
            Platform.OS === 'android' ? { top: height - 45 } : {},
          ]}
          source={require('../assets/Branches.png')}
        />
        <Image
          resizeMode={'stretch'}
          style={[
            { position: 'absolute', top: height * 2, height, width },
            Platform.OS === 'android' ? { top: (height * 2) - 45 } : {},
          ]}
          source={require('../assets/Branches.png')}
        />
        <Image
          resizeMode={'stretch'}
          style={[
            { position: 'absolute', top: height * 3, height, width },
            Platform.OS === 'android' ? { top: (height * 3) - 45 } : {},
          ]}
          source={require('../assets/Branches.png')}
        />
        <Image
          resizeMode={'stretch'}
          style={[
            { position: 'absolute', top: height * 4, height, width },
            Platform.OS === 'android' ? { top: (height * 4) - 45 } : {},
          ]}
          source={require('../assets/BranchesBottom.png')}
        />

        { /** Birds **/}
        <View
          style={
            props.screenReader ? { paddingTop: 75 } : {}
          }
        >
          {props.birds.map((bird, index) => {
            return (
              <Bird
                key={bird.uuid}
                bird={bird}
                screenReader={props.screenReader}
                mirror={bird.aboutScreenConstants.mirrored}
                navKey={props.navigatorKey}
                label={true}
                songButton={false}
                selected={true}
                image={bird.images}
                position={bird.aboutScreenConstants.iconPosition}
                topOffset={Platform.OS === 'ios' ? 0 : -45}
                index={index}
                onPress={() => {
                  props.actions.showInfoCards(bird, index);
                }}
              />
            );
          })}
        </View>

        { /** Credits **/}
        <View
          style={[
            styles.credits,
            Platform.OS === 'ios' ? { height: height * 0.9, top: (height * 4.18) } :
                                    { height: height - 94, top: (height * 4.1) },
          ]}
        >
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Text
              style={[styles.navTitleText, height <= 568 ? { marginBottom: 10 } : {}]}
              accessible={true}
              accessibilityTraits={'header'}
            >
              Credits
            </Text>
            { /** Link **/ }
            <TouchableOpacity
              accessibilityTraits={'link'}
              accessibilityLabel={'Dawn Chorus is a collaboration between Carnegie Museum of Natural History, BirdSafe Pittsburgh, and the Innovation Studio at Carnegie Museums of Pittsburgh. Tap to visit carnegiemnh.org/.'}
              activeOpacity={0.7}
              onPress={() => {
                const url = 'http://www.carnegiemnh.org/';
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) { return Linking.openURL(url); }
                  return null;
                }).catch(err => console.error('An error occurred', err));
              }}
              style={[styles.link, height <= 568 ? { marginBottom: 5 } : {}]}
            >
              <Text style={[globalStyles.bodyText]}>
                Dawn Chorus is a collaboration between Carnegie Museum of Natural History, BirdSafe Pittsburgh, and the Innovation Studio at Carnegie Museums of Pittsburgh.
              </Text>
              <View style={styles.urlButton}>
                <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
                  carnegiemnh.org
                </Text>
                <View style={styles.arrow}>
                  <Image
                    style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                    source={require('../assets/RightFacingArrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            { /** Link **/ }
            <TouchableOpacity
              accessibilityTraits={'link'}
              accessibilityLabel={'Bird photographs courtesy of Steve Gosser. Tap to visit gosserphotos.com.'}
              activeOpacity={0.7}
              onPress={() => {
                const url = 'http://gosserphotos.com/';
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) { return Linking.openURL(url); }
                  return null;
                }).catch(err => console.error('An error occurred', err));
              }}
              style={[styles.link, height <= 568 ? { marginBottom: 5 } : {}]}
            >
              <Text style={[globalStyles.bodyText]}>
                Bird photographs courtesy of Steve Gosser.
              </Text>
              <View style={styles.urlButton}>
                <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
                  gosserphotos.com
                </Text>
                <View style={styles.arrow}>
                  <Image
                    style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                    source={require('../assets/RightFacingArrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            { /** Link **/ }
            <TouchableOpacity
              accessibilityTraits={'link'}
              accessibilityLabel={'Sounds sourced from Macaulay Library, Cornell University. Tap to visit macaulaylibrary.org.'}
              activeOpacity={0.7}
              onPress={() => {
                const url = 'http://macaulaylibrary.org/';
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) { return Linking.openURL(url); }
                  return null;
                }).catch(err => console.error('An error occurred', err));
              }}
              style={[styles.link, height <= 568 ? { marginBottom: 5 } : {}]}
            >
              <Text style={[globalStyles.bodyText]}>
                Sounds sourced from Macaulay Library, Cornell University.
              </Text>
              <View style={styles.urlButton}>
                <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
                  macaulaylibrary.org
                </Text>
                <View style={styles.arrow}>
                  <Image
                    style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                    source={require('../assets/RightFacingArrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            { /** Link **/ }
            <TouchableOpacity
              accessibilityTraits={'link'}
              accessibilityLabel={'Flower illustrations by Ashley Cecil, artist-in-residence at Carnegie Museum of Natural History. Tap to visit ashleycecil.com.'}
              activeOpacity={0.7}
              onPress={() => {
                const url = 'https://www.ashleycecil.com/';
                Linking.canOpenURL(url).then((supported) => {
                  if (supported) { return Linking.openURL(url); }
                  return null;
                }).catch(err => console.error('An error occurred', err));
              }}
              style={[styles.link, height <= 568 ? { marginBottom: 5 } : {}]}
            >
              <Text style={[globalStyles.bodyText]}>
                Flower illustrations by Ashley Cecil, artist-in-residence at Carnegie Museum of Natural History.
              </Text>
              <View style={styles.urlButton}>
                <Text style={[globalStyles.bodyTextLight, styles.urlButtonText]}>
                  ashleycecil.com
                </Text>
                <View style={styles.arrow}>
                  <Image
                    style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: OFFBLACK }}
                    source={require('../assets/RightFacingArrow.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            { /** Link **/ }
            <View
              accessibilityLabel={'Bird illustrations by Sam Ticknor.'}
              style={[styles.link, height <= 568 ? { marginBottom: 5 } : {}]}
            >
              <Text style={[globalStyles.bodyText]}>
                Bird illustrations by Sam Ticknor.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      { /** Flora Overlay **/}
      <Image
        pointerEvents={'none'}
        resizeMode={'stretch'}
        style={[
          {
            position: 'absolute',
            left: 0,
            width: 35,
          },
          Platform.OS === 'ios' ? { top: 64, height: height - 64 } : { top: 0, height },
        ]}
        source={require('../assets/BranchesOverlayLeft.png')}
      />
      <Image
        pointerEvents={'none'}
        resizeMode={'stretch'}
        style={[
          {
            position: 'absolute',
            right: 0,
            width: 35,
          },
          Platform.OS === 'ios' ? { top: 64, height: height - 64 } : { top: 0, height },
        ]}
        source={require('../assets/BranchesOverlayRight.png')}
      />

      { /** Activity Indicator **/}
      {props.infoCards &&
        <View style={styles.loadingIndicator}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      }

    </View>
  );
};

AboutBirdsScreen.propTypes = {
  navigatorKey: PropTypes.string.isRequired,
  screenReader: PropTypes.bool.isRequired,
  infoCards: PropTypes.bool.isRequired,
  birds: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    showInfoCards: PropTypes.func.isRequired,
  }).isRequired,
};

export default AboutBirdsScreen;
