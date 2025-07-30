import { createSlice, current } from "@reduxjs/toolkit";

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
    logIn: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.status = 'succeeded';
      console.log('🔥 Текущий state в authSlice:', current(state));
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
    }
  }
})

export const { logIn, logOut, setAuthFailed, setAuthLoading } = authSlice.actions;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export default authSlice.reducer;
