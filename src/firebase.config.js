// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDz2tbgfeKTC7J_97cHVU7tJ_dPNDfyq7I',
  authDomain: 'alondra-11169.firebaseapp.com',
  projectId: 'alondra-11169',
  storageBucket: 'alondra-11169.appspot.com',
  messagingSenderId: '851446672800',
  appId: '1:851446672800:web:8db2ef0de84cbf1caa88c5',
  measurementId: 'G-P1CXP91JZF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getFirestore(app);

export { analytics, auth, database };
