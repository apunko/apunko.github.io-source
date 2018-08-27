import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAjNWC4Z4oL_zOdYFitZ-I-avtESGSW2SQ',
  authDomain: 'apunko-e0709.firebaseapp.com',
  databaseURL: 'https://apunko-e0709.firebaseio.com',
  projectId: 'apunko-e0709',
  storageBucket: 'apunko-e0709.appspot.com',
  messagingSenderId: '547406359866',
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth;
  }
}

export default new Firebase();
