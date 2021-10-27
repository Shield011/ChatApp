// import * as firebase from "firebase";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDwk55ev5GZy6VKUxaVHmovmv1v-vfy4PY",
    authDomain: "chatapp-19c31.firebaseapp.com",
    projectId: "chatapp-19c31",
    storageBucket: "chatapp-19c31.appspot.com",
    messagingSenderId: "1091759075556",
    appId: "1:1091759075556:web:924674f0d34eb38956fcf1",
    measurementId: "G-2E9JEZGLFR"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;