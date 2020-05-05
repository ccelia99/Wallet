import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD1TTgqsaDlRWDMGEuIRn6tpSrNVKMl5qw",
    authDomain: "wallet-e38d5.firebaseapp.com",
    databaseURL: "https://wallet-e38d5.firebaseio.com",
    projectId: "wallet-e38d5",
    storageBucket: "wallet-e38d5.appspot.com",
    messagingSenderId: "923430157458",
    appId: "1:923430157458:web:19f5a6a4814edfb7fc3a4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   // kayttjan autentikointi
   export const provider = new firebase.auth.GoogleAuthProvider();
   export const auth = firebase.auth();
 
   export default firebase;
 
