import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCL9kCO15o9TySDbIvaD4tHrdEqC-c0FHw",
    authDomain: "screentime-fa7f8.firebaseapp.com",
    projectId: "screentime-fa7f8",
    storageBucket: "screentime-fa7f8.appspot.com",
    messagingSenderId: "1010056779104",
    appId: "1:1010056779104:web:d03fe896fe4a0cb6defa05",
    measurementId: "G-L2VQPHPWND"
  })

export const auth = firebaseApp.auth()
export const firebaseAuth = firebase.auth
export default firebaseApp