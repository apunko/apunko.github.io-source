import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/firestore');

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
    this.db = firebase.firestore;
  }
}

export default new Firebase();
