import { db } from '../firebase/config';
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  addDoc,
} from 'firebase/firestore';

const uploadPostsToServer = async () => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};
