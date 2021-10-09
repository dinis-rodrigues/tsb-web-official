import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHPrWvVr1El3NkJd3C0gbZbiTl_weCTlE",
  authDomain: "tsb-aplication.firebaseapp.com",
  databaseURL: "https://tsb-aplication.firebaseio.com",
  projectId: "tsb-aplication",
  storageBucket: "tsb-aplication.appspot.com",
  messagingSenderId: "124968779478",
  appId: "1:124968779478:web:0a2c6266560c594a779377",
  measurementId: "G-0Z77DRSCH6",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBZm2feIZTi5dTGRQuJKoQUEwdh1axiSgs",
//   authDomain: "tsb-application-dev.firebaseapp.com",
//   databaseURL:
//     "https://tsb-application-dev-default-rtdb.europe-west1.firebasedatabase.app/",
//   projectId: "tsb-application-dev",
//   storageBucket: "tsb-application-dev.appspot.com",
//   messagingSenderId: "403433771845",
//   appId: "1:403433771845:web:1a4bba7416dc343ef9a42c",
// };

// Initialize Firebase
const app: firebase.FirebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;
