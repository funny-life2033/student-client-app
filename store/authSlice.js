import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    error: null,
    isLoading: false,
    detail: null,
  },
  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    loggedIn: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.detail = payload;
      state.isLoggedIn = true;
    },
    loggingFailed: (state, { payload }) => {
      state.isLoading = false;
      state.detail = null;
      state.error = payload;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.detail = null;
      state.error = null;
    },
    setDetail: (state, { payload }) => {
      state.detail = payload;
    },
  },
});

export const { loggedIn, loggingFailed, login, logout, setDetail } =
  authSlice.actions;
export default authSlice.reducer;
