import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';

import { OFFBLACK } from '../styles';

const styles = StyleSheet.create({
  pickerStyle: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerText: {
    width: 60,
    height: 45,
    fontSize: 36,
    fontFamily: 'SourceSerifPro-Regular',
    color: OFFBLACK,
    textAlign: 'center',
  },
  valueScroller: {
    height: 135,
    flex: 1,
  },
});

const TimePicker = (props) => {
  let hourScrollView;
  let minuteScrollView;

  const pickerItemHeight = 45;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pickerStyle}>
        <ScrollView
          ref={(scrollView) => { hourScrollView = scrollView; }}
          contentOffset={{ y: pickerItemHeight * ((props.time.hour - 1) + 12) }}
          onMomentumScrollEnd={(event) => {
            const hour = ((event.nativeEvent.contentOffset.y + pickerItemHeight) / pickerItemHeight) % 12;
            props.onTimeChange({ hour: Math.floor(hour) });
          }}
          contentContainerStyle={{ paddingTop: pickerItemHeight, paddingBottom: pickerItemHeight }}
          snapToAlignment={'center'}
          snapToInterval={pickerItemHeight}
          showsVerticalScrollIndicator={false}
          style={styles.valueScroller}
        >
          {[...Array(36)].map((x, i) =>
            <Text
              key={`${i}`}
              style={styles.pickerText}
            >
              { (i + 1) % 12 === 0 ? 12 : (i + 1) % 12}
            </Text>
          )}
        </ScrollView>
        <Text style={[styles.pickerText, { width: 10 }]}>
          :
        </Text>
        <ScrollView
          contentOffset={{ y: pickerItemHeight * (props.time.minute + 60) }}
          onMomentumScrollEnd={(event) => {
            props.onTimeChange({ minute: Math.floor(event.nativeEvent.contentOffset.y / pickerItemHeight) % 60 });
          }}
          contentContainerStyle={{ paddingTop: pickerItemHeight, paddingBottom: pickerItemHeight }}
          snapToAlignment={'center'}
          snapToInterval={pickerItemHeight}
          ref={(scrollView) => { minuteScrollView = scrollView; }}
          showsVerticalScrollIndicator={false}
          style={styles.valueScroller}
        >
          {[...Array(180)].map((x, i) =>
            <Text
              key={`${i}`}
              style={styles.pickerText}
            >
              {(i % 60) < 10 ? `0${(i % 60)}` : (i % 60)}
            </Text>
          )}
        </ScrollView>
        <Text style={[styles.pickerText, { width: 10 }]}>
          {' '}
        </Text>
        <ScrollView
          contentOffset={{ y: props.time.hour < 12 ? 0 : pickerItemHeight }}
          onMomentumScrollEnd={(event) => {
            props.onTimeChange({ period: event.nativeEvent.contentOffset.y === 0 ? 'am' : 'pm' });
          }}
          contentContainerStyle={{ paddingTop: pickerItemHeight, paddingBottom: pickerItemHeight }}
          snapToAlignment={'center'}
          snapToInterval={pickerItemHeight}
          showsVerticalScrollIndicator={false}
          style={styles.valueScroller}
        >
          <Text style={styles.pickerText}>
            am
          </Text>
          <Text style={styles.pickerText}>
            pm
          </Text>
        </ScrollView>
      </View>
      <Image
        pointerEvents={'none'}
        resizeMode={'stretch'}
        source={require('../assets/PickerOverlay.png')}
        style={{ position: 'absolute', top: -70, left: 0, right: 0, height: 140, width: 200 }}
      />
    </View>
  );
};

TimePicker.propTypes = {
  time: PropTypes.object.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default TimePicker;
