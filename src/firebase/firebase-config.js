
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey:process.env.REACT_APP_APIKEY ,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL:process.env.REACT_APP_DATABASEURL ,
    projectId:process.env.REACT_APP_PROJECTID ,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
    appId: process.env.REACT_APP_APPID,
    measurementId:process.env.REACT_APP_MEASUREMENTID
  };

/*const firebaseConfigTesting = {
    apiKey: "AIzaSyCRaMxaKX80I1MtTOIump3QDKAVKcvs8PE",
    authDomain: "test-6ff0c.firebaseapp.com",
    databaseURL: "https://test-6ff0c.firebaseio.com",
    projectId: "test-6ff0c",
    storageBucket: "test-6ff0c.appspot.com",
    messagingSenderId: "318427017659",
    appId: "1:318427017659:web:dd3489d5f40bfc23f9149e",
    measurementId: "G-VZLGRWN5M6"
  };
  */


/*if(process.env.NODE_ENV === 'test'){
  //testing
  firebase.initializeApp(firebaseConfigTesting);

}else {

}*/


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//base de datos
const db = firebase.firestore();

//auth con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {db,googleAuthProvider,firebase}