import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export const commentsCounter = async postId => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const commentCount = querySnapshot.size;

    return commentCount;
  } catch (error) {
    console.log('commentsCounter error:', error);
  }
};
