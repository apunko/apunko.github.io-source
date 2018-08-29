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
    this.db = firebase.firestore;
  }

  hupsRef(userEmail) {
    return this.db().collection('users').doc(userEmail).collection('hups');
  }
}

export default new Firebase();
