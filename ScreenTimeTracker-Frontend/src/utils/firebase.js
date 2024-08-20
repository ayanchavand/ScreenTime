import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 

const firebaseApp = firebase.initializeApp(process.env.FIREFIREBASE_CONFIG)

export const auth = app.auth();

export default firebaseApp