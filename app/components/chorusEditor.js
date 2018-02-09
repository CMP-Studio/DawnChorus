import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import Bird from './bird';

import { indexOfBird } from '../utilities';

import { OFFWHITE } from './../styles';

const styles = StyleSheet.create({
});

const ChorusEditor = (props) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: OFFWHITE }}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { height: (height * 4) + 80, width },
        ]}
        showsVerticalScrollIndicator={false}
      >
        { /** Scroll Background **/ }
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: -height, height, width, opacity: 0.5 }}
          source={require('../assets/ScrollEdges.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: 0, height, width, opacity: 0.5 }}
          source={require('../assets/Branches.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: height, height, width, opacity: 0.5 }}
          source={require('../assets/Branches.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: (height * 2), height, width, opacity: 0.5 }}
          source={require('../assets/Branches.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: (height * 3), height, width, opacity: 0.5 }}
          source={require('../assets/Branches.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: (height * 4), height, width, opacity: 0.5 }}
          source={require('../assets/Branches.png')}
          overflow={'visible'}
        />
        <Image
          resizeMode={'stretch'}
          style={{ position: 'absolute', top: (height * 5), height, width, opacity: 0.5 }}
          source={require('../assets/ScrollEdges.png')}
          overflow={'visible'}
        />

        { /** Birds **/}
        <View>
          {props.birds.map((bird, index) => {
            let isInChorus = false;
            if (indexOfBird(bird.uuid, props.chorus) !== -1) {
              isInChorus = true;
            }
            return (
              <Bird
                sampling={props.sampleChorus}
                key={bird.uuid}
                navKey={props.navigatorKey}
                bird={bird}
                selected={isInChorus}
                selectable={props.chorus.length < 5}
                label={true}
                songButton={true}
                image={bird.images}
                topOffset={0}
                position={bird.aboutScreenConstants.iconPosition}
                mirror={bird.aboutScreenConstants.mirrored}
                index={index}
                toggleSampleChorus={props.actions.toggleSampleChorus}
                onPress={() => {
                  props.onPress();
                  let updatedChorus = [];
                  if (props.chorus.length < 5 && !isInChorus) {
                    updatedChorus = [...props.chorus].concat([bird]);
                    props.actions.editAlarmChorus(updatedChorus);
                  } else if (isInChorus && props.chorus.length > 0) {
                    updatedChorus = props.chorus.filter((chorusBird) => {
                      return bird.uuid !== chorusBird.uuid;
                    });
                    props.actions.editAlarmChorus(updatedChorus);
                  } else if (props.chorus.length === 5) {
                    props.limitReached();
                  }
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

ChorusEditor.propTypes = {
  navigatorKey: PropTypes.string.isRequired,
  birds: PropTypes.arrayOf(PropTypes.object),
  chorus: PropTypes.arrayOf(PropTypes.object),
  limitReached: PropTypes.func.isRequired,
  sampleChorus: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    editAlarmChorus: PropTypes.func.isRequired,
    toggleSampleChorus: PropTypes.func.isRequired,
  }).isRequired,
};

export default ChorusEditor;
