import firebase from 'firebase';

const {
  apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId,
} = require('../config/public-keys.json');

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth;
  }
}

export default new Firebase();
