import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAA6zM9Te6RbBpS_pW0Rz1MHbKopsWjadA",
    authDomain: "clone-instagram-75d6b.firebaseapp.com",
    projectId: "clone-instagram-75d6b",
    storageBucket: "clone-instagram-75d6b.appspot.com",
    messagingSenderId: "656342960568",
    appId: "1:656342960568:web:361c725a03805637c1a74d",
    measurementId: "G-X77KSN4K97"
  });



const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, storage, functions };