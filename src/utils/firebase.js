import firebase from 'firebase';
require('dotenv').config();

// Provided by the Firebase console
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};


// Firebase instance
const app = firebase.initializeApp(config);

const database = firebase.database();
const auth = app.auth();
export { database, auth };
