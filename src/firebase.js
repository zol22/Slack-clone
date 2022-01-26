import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBK81E4fNayyUiOvHU5wM92XEZftXGweIM",
    authDomain: "slack-clone-ddbd0.firebaseapp.com",
    projectId: "slack-clone-ddbd0",
    storageBucket: "slack-clone-ddbd0.appspot.com",
    messagingSenderId: "458192321279",
    appId: "1:458192321279:web:ce3a56938d0f31628f2aca",
    measurementId: "G-L8BKMZVSRF"
  };


  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


export { db, auth, provider };