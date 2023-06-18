import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const commentsCounter = async postId => {
  console.log(
    '🚀 ~ file: commentsCounter.js:5 ~ commentsCounter ~ postId:',
    postId
  );

  try {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const commentCount = querySnapshot.size;
    console.log(
      '🚀 ~ file: commentsCounter.js:11 ~ commentsCounter ~ commentCount:',
      commentCount
    );

    return commentCount;
  } catch (error) {
    console.log('commentsCounter error:', error);
  }
};
