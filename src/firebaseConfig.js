import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDAEOajP1nmtjQsIIKWR-uBcWfUoURfLPU",
  authDomain: "funky-charts.firebaseapp.com",
  projectId: "funky-charts",
  storageBucket: "funky-charts.appspot.com",
  messagingSenderId: "213719591090",
  appId: "1:213719591090:web:eb43ca54510bbf8605c1ab",
  measurementId: "G-00VQ2GE6EM"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);