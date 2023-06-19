import { db } from '../firebase/config';
import { collection, getCountFromServer } from 'firebase/firestore';

export const likesCounter = async postId => {
  try {
    const querySnapshot = await getCountFromServer(
      collection(db, `posts/${postId}/likes`)
    );
    const likeCount = querySnapshot.data().count;

    return likeCount;
  } catch (error) {
    console.log('likesCounter error:', error);
  }
};
