//file to connect with firebase database
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB6Ys0zYCf7i3hnxQLVtPuiMpWK1MYbmpw",
    authDomain: "whatsapp-clone-e2a6e.firebaseapp.com",
    projectId: "whatsapp-clone-e2a6e",
    storageBucket: "whatsapp-clone-e2a6e.appspot.com",
    messagingSenderId: "606426581134",
    appId: "1:606426581134:web:9d2e1fb3226afe8534a1df",
    measurementId: "G-CZP4KRD2WP"
  };

  const firebaseApp =
  firebase.initializeApp(firebaseConfig);
  
  //access the database from firebase store into the db variable 
  const db= firebaseApp.firestore();
  const auth= firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth , provider};
  export default db;