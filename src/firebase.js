import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTLKciwh7h6jXFn8RIOYl2Mtf2V9v8Zz4",
  authDomain: "instagram-4955d.firebaseapp.com",
  databaseURL: "https://instagram-4955d-default-rtdb.firebaseio.com",
  projectId: "instagram-4955d",
  storageBucket: "instagram-4955d.appspot.com",
  messagingSenderId: "317793188137",
  appId: "1:317793188137:web:ebb130bd554de536d01f38",
  measurementId: "G-VDG72YKCJX"
})
const db=firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()
export {db,auth,storage}