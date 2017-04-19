import IdleTimerManager from 'react-native-idle-timer';

import { checkAlarms } from '../actions/alarm';

const MINUTE = 60 * 1000;

const TIMER_TYPE_TIMEOUT = 'TIMER_TYPE_TIMEOUT';
const TIMER_TYPE_INTERVAL = 'TIMER_TYPE_INTERVAL';

export default class TimeWatcherActor {
  constructor(store) {
    this.dispatch = store.dispatch;
    this.timerID = null;
    this.timerType = null;

    // console.log('timer is off')
    // console.log('screen will not dim')
    // console.log('setting idle timer disabled to true, notifications.ios.js line 49');
    IdleTimerManager.setIdleTimerDisabled(true);
    this.watchTime();
  }

  repeatEvery(func, interval) {
    // Check current time and calculate the delay until next interval
    const now = new Date();
    const delay = interval - now % interval;

    function start() {
      func();
      this.timerID = setInterval(func, interval);
      this.timerType = TIMER_TYPE_INTERVAL;
    }

    // Delay execution until it's an even interval
    this.timerID = setTimeout(start, delay);
    this.timerType = TIMER_TYPE_TIMEOUT;
  }

  watchTime() {
    // Check if it's this minute then check every minute after
    this.repeatEvery(() => { checkAlarms(this.dispatch); }, MINUTE);
  }

  killActor(silent) {
    if (!silent) {
      // console.log('timer is on');
      // console.log('screen will dim');
      // console.log('setting idle timer disabled to false, notifications.ios.js line 43');
      IdleTimerManager.setIdleTimerDisabled(false);
    }

    if (this.timerType) {
      switch (this.timerType) {
        case TIMER_TYPE_TIMEOUT: {
          clearTimeout(this.timerID);
          break;
        }

        case TIMER_TYPE_INTERVAL: {
          clearInterval(this.timerID);
          break;
        }

        default: {
          break;
        }
      }
    }
  }
}
