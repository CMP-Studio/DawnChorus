
const MINUTE = 60 * 1000;

const TIMER_TYPE_TIMEOUT = 'TIMER_TYPE_TIMEOUT';
const TIMER_TYPE_INTERVAL = 'TIMER_TYPE_INTERVAL';

import { checkAlarms } from '../actions/alarm';

export default class TimeWatcherActor {
  constructor(store) {
    this.dispatch = store.dispatch;
    this.timerID = null;
    this.timerType = null;

    this.watchTime()
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
    this.repeatEvery(() => { checkAlarms(this.dispatch) }, MINUTE);
  }

  killActor() {
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
      }
    }
  }
}
