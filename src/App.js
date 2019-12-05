import React, { Component } from 'react';
import './App.css';
import { askForPermissioToReceiveNotifications } from './push-notification';
import * as firebase from 'firebase';

class App extends Component {
  state = {  }

  componentDidMount() {
    if ( !this.isTokenSentToServer() ) {
      askForPermissioToReceiveNotifications();
    }

    navigator.serviceWorker.addEventListener("message", (message) => console.log("Message background: ", message));

    // const messaging = firebase.messaging();

    // messaging.onMessage((payload) => console.log('Message foreground received. ', payload));
  }

  isTokenSentToServer = () => {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  render() { 
    return ( 
      <div className="App">
        <header className="App-header">
          <p>
            Firebase Push Notifications
          </p>
        </header>
      </div>
    );
  }
}
 
export default App;
