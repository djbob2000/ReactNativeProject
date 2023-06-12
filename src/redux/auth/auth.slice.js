import { createSlice } from '@reduxjs/toolkit';
import { initState } from './auth.initState';

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      login: action.payload.login,
      email: action.payload.email,
    }),

    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload,
    }),

    authSignOut: () => initState,
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
