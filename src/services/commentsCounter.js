import { db } from '../firebase/config';

import { collection, getCountFromServer } from 'firebase/firestore';

export const commentsCounter = async postId => {
  console.log(
    '🚀 ~ file: commentsCounter.js:6 ~ commentsCounter ~ postId:',
    postId
  );

  try {
    const query = collection(db, 'posts', postId, 'comments');
    const snapshot = await getCountFromServer(query);
    const counter = await snapshot.data().counter;
    return counter;
  } catch (error) {
    console.log('commentsCounter error: ', error);
  }
};
