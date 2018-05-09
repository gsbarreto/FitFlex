import * as firebase from "firebase"; 

export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBd4OJjh5XuSxGeh2Nozk4Dl-5GnmwGSRo",
    authDomain: "fitflex-8bb1a.firebaseapp.com",
    databaseURL: "https://fitflex-8bb1a.firebaseio.com",
    projectId: "fitflex-8bb1a",
    storageBucket: "fitflex-8bb1a.appspot.com",
    messagingSenderId: "779574650975"
  };
firebase.initializeApp(FIREBASE_CONFIG);

export var firebaseDatabase = firebase.database();