import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem('username') || null,
  token: localStorage.getItem('jwttoken') || null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.status = 'loading';
    },
    setAuthData: (state, { payload }) => {
      state.user = payload.username;
      state.token = payload.token;
      state.status = 'succeeded';
      localStorage.setItem('username', payload.username);
      localStorage.setItem('jwttoken', payload.token);
    },
    setAuthFailed: (state, { payload }) => {
      state.error = payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.status = 'idle';
      localStorage.removeItem('username');
      localStorage.removeItem('jwttoken');
    },
  }
})

export const { logOut, setAuthFailed, setAuthLoading, setAuthData } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;
