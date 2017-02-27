import React, {
  PropTypes,
} from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { LIGHTGRAY } from './../styles';

const styles = StyleSheet.create({
  chorusListing: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const ChorusListing = (props) => {
  const emptySpaces = (5 - props.chorus.length);

  return (
    <View
      style={[
        styles.chorusListing,
        { width: (5 * props.birdSize) + (4 * (props.margin + 3)) },
      ]}
    >
      { /** Chorus Birds **/}
      {props.chorus.map((bird, index) => {
        return (
          <TouchableOpacity
            accessible={!(props.onBirdPress === undefined)}
            importantForAccessibility={props.onBirdPress === undefined ? 'no' : 'yes'}
            accessibilityLabel={`Chorus bird ${index + 1} of ${5}. ${bird.name}. Tap to remove from chorus.`}
            activeOpacity={props.onBirdPress === undefined ? 1 : 0.7}
            disabled={props.onBirdPress === undefined}
            onPress={() => { props.onBirdPress(bird); }}
            key={index}
            style={[
              {
                backgroundColor: LIGHTGRAY,
                width: props.birdSize,
                height: props.birdSize,
                marginRight: props.margin - 3,
                borderRadius: props.birdSize / 2,
                marginLeft: 3,
                marginTop: 3,
                marginBottom: 3,
              },
              props.onBirdPress === undefined ? {} : { elevation: 2 },
            ]}
          >
            {(() => {
              if (bird !== null) {
                return (
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: props.birdSize,
                      height: props.birdSize,
                    }}
                    source={{ uri: bird.images.face }}
                  />
                );
              }
              return null;
            })()}
          </TouchableOpacity>
        );
      })}

      { /** Empty Chorus Spaces **/}
      <View
        accessible={true}
        importantForAccessibility={props.onBirdPress === undefined ? 'no' : 'yes'}
        style={{
          flex: 1,
          flexDirection: 'row',
          minWidth: 1,
        }}
        accessibilityLabel={
          emptySpaces !== 0 ?
          `You can select up to ${emptySpaces} more ${emptySpaces === 1 ? 'bird' : 'birds'} for this chorus.` :
          'You have no room to add birds to this chorus.'
        }
      >
        {[...Array((5 - props.chorus.length))].map((x, i) =>
          <View
            key={i}
            style={[
              {
                borderColor: LIGHTGRAY,
                borderWidth: 2,
                borderStyle: 'dashed',
                width: props.birdSize,
                height: props.birdSize,
                marginRight: props.margin - 3,
                borderRadius: props.birdSize / 2,
                marginLeft: 3,
                marginTop: 3,
                marginBottom: 3,
              },
              props.onBirdPress === undefined ? { opacity: 0 } : {},
            ]}
          />
        )}
      </View>
    </View>
  );
};

ChorusListing.propTypes = {
  chorus: PropTypes.arrayOf(PropTypes.object),
  birdSize: PropTypes.number.isRequired,
  margin: PropTypes.number,
  onBirdPress: PropTypes.func,
};

export default ChorusListing;
