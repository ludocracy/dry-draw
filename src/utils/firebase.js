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

// Handle anonymous user auth;
app.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        window.user = user;
    } else {
        app.auth().signInAnonymously().catch(function(error) {
            console.log(error);
        });
    }
});

const database = firebase.database();

export { database };
