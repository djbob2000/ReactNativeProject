import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { authSignOut, authStateChange, updateUserProfile } from './auth.slice';

import { app } from '../../firebase/config';

export const auth = getAuth(app);

//register user
const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      const {
        user: { uid, displayName },
      } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: login });

      dispatch(updateUserProfile({ userId: uid, login: displayName }));
    } catch (error) {
      console.log('error', error);
      console.log(error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log('>>>>authSignInUser<<<<');

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(updateUserProfile({ userId: uid, login: displayName, email }));
        dispatch(authStateChange(true));
      }
    } catch (error) {
      console.log('error', error);
      console.log(error.message);
    }
  };

const authChangeStatus = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(updateUserProfile({ userId: uid, login: displayName, email }));
        dispatch(authStateChange(true));
      }
    });
  } catch (error) {
    console.log('error', error);
    console.log(error.message);
  }
};

const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      console.log('LogOut is successful');
    })
    .catch(error => console.log(error));

  dispatch(authSignOut());
};

export { authSignUpUser, authSignInUser, authSignOutUser, authChangeStatus };
