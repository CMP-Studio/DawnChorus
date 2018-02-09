import { combineReducers } from 'redux';

import navigator from './navigator';
import audio from './audio';
import alarms from './alarms';
import infoCards from './infoCards';

const rootReducer = combineReducers({
  navigator,
  audio,
  alarms,
  infoCards,
});

export default rootReducer;
