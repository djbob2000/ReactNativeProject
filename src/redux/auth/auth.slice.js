import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './auth.initState';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStateChange: (state, { payload }) => {
      state.authStatus = payload;
      console.log('payload', payload);
    },
  },
});

export const { authStateChange } = authSlice.actions;

export const authReducer = authSlice.reducer;
