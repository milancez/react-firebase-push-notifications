import * as firebase from 'firebase';

export const initializeFirebase = () => {

  firebase.initializeApp({    
    apiKey: "AIzaSyBTLAyK4H3XcJnBoPJ9FOXRgam9gt5gyjA",
    authDomain: "push-notifications-91606.firebaseapp.com",
    databaseURL: "https://push-notifications-91606.firebaseio.com",
    projectId: "push-notifications-91606",
    storageBucket: "push-notifications-91606.appspot.com",    
    appId: "1:888721802953:web:0a112bb2dbf89a2ee0af18",
    measurementId: "G-DLZC2YN866",
    messagingSenderId: "888721802953"
  });

  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });

}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    setTokenSentToServer(true, token);
    console.log('user token:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

function setTokenSentToServer(sent, token) {
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}
