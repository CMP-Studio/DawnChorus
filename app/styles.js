import {
  StyleSheet,
} from 'react-native';

export const OFFBLACK = '#4C4B48';
export const OFFBLACKTRANSPARENT = '#00000066';
export const LIGHTGRAY = '#f2ecd9';
export const GRAY = '#a09c8d';
export const TEAL = '#097D8D';
export const RED = '#b95444';
export const GREEN = '#6d7646';
export const DARKGREEN = '#9c8e53';
export const YELLOW = '#fff4da';
export const OFFWHITE = '#fefcf6';
export const OFFWHITETRANSPARENT = '#fefcf6aa';

export const globalStyles = StyleSheet.create({
  bodyText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    color: OFFBLACK,
    backgroundColor: 'transparent',
  },
  bodyTextLight: {
    fontFamily: 'SourceSerifPro-Light',
    fontSize: 16,
    color: OFFBLACK,
    backgroundColor: 'transparent',
  },
});
