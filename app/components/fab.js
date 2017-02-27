import React, { PropTypes } from 'react';

import * as Animatable from 'react-native-animatable';

import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  actionButtonImage: {
    width: 56,
    height: 56,
  },
});

const Fab = (props) => {
  return (
    <View>
      {props.disabledImage !== undefined &&
      <Image
        style={[styles.actionButtonImage, props.position]}
        source={props.disabledImage}
      />
      }
      {!props.enabled &&
      <View>
        <Animatable.View
          importantForAccessibility="no"
          animation={'zoomOut'}
          duration={100}
          style={[
            props.position,
            { elevation: 2, backgroundColor: props.color, borderRadius: 28 },
          ]}
        >
          <Image
            style={[styles.actionButtonImage]}
            source={props.image}
          />
        </Animatable.View>
      </View>
      }
      {props.enabled &&
      <Animatable.View
        importantForAccessibility="no"
        animation={'zoomIn'}
        duration={100}
        style={[
          props.position,
          { elevation: 2, backgroundColor: props.color, borderRadius: 28 },
        ]}
      >
        <TouchableOpacity
          accessible={true}
          importantForAccessibility={'yes'}
          accessibilityLabel={props.accessibilityLabel}
          activeOpacity={0.7}
          onPress={() => { props.onPress(); }}
        >
          <Image
            style={[styles.actionButtonImage]}
            source={props.image}
          />
        </TouchableOpacity>
      </Animatable.View>
    }
    </View>
  );
};

Fab.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string.isRequired,
  position: PropTypes.object,
  image: PropTypes.number,
  accessibilityLabel: PropTypes.string,
  enabled: PropTypes.bool,
  disabledImage: PropTypes.number,
};

export default Fab;
