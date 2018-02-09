import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux';
import { AppState, BackHandler } from 'react-native';

import Root from './containers/root';
import configureStore from './store';

import { unloadAlarm, loadAlarms, snoozeAlarm, stopAlarm, soundAlarm } from './actions/alarm';

var PushNotification = require('react-native-push-notification');

class App extends Component {

  static propTypes = {
    // You can define propTypes for keys in `initialProps` here
    alarmID: PropTypes.string,
    missedAlarms: PropTypes.string,
  }

  static store;

  constructor(props) {
    super(props);
    this.store = configureStore();

    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification(notification) {
          if (notification.action !== undefined) {
            if (notification.action === 'Stop') {
              store.dispatch(stopAlarm(notification.alarmUUID));
            } else if (notification.action === 'Snooze') {
              store.dispatch(snoozeAlarm(notification.alarmUUID));
            }
          } else {
            store.dispatch(soundAlarm(notification.alarmUUID));
          }
        },
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
        requestPermissions: false,
    });
    PushNotification.registerNotificationActions(['Snooze', 'Stop']);
  }

  componentDidMount() {
    this.store.dispatch(loadAlarms(this.props.alarmID, this.props.missedAlarms));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
