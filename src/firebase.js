import firebase from "firebase";

const API_KEY = process.env.REACT_APP_API_KEY;
const SENDER_ID = process.env.REACT_APP_SENDER_ID;

var config = {
  apiKey: API_KEY,
  authDomain: "contract-8a225.firebaseapp.com",
  databaseURL: "https://contract-8a225.firebaseio.com",
  projectId: "contract-8a225",
  storageBucket: "contract-8a225.appspot.com",
  messagingSenderId: SENDER_ID
};
firebase.initializeApp(config);
export default firebase;
