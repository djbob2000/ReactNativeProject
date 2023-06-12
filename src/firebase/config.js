import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  connectAuthEmulator,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCoS4TIR_wwWHhLtAuO4jeTsXyw54zhMbk',
  authDomain: 'react-native-app-dc602.firebaseapp.com',
  databaseURL:
    'https://react-native-app-dc602-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-app-dc602',
  storageBucket: 'react-native-app-dc602.appspot.com',
  messagingSenderId: '255766186672',
  appId: '1:255766186672:web:ac8b1d82acf19b5b220975',
  measurementId: 'G-JHZ6ZDFNR2',
};

let app;
let auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  app = getApps();
  auth = getAuth(app);
}

export { auth };

export const db = getFirestore(app);
export const storage = getStorage(app);
