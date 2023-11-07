import { createSlice } from "@reduxjs/toolkit";

const botSlice = createSlice({
  name: "bot",
  initialState: {
    newSlot: false,
    isWorking: false,
    isStarting: false,
    isStopping: false,
    errorAlert: null,
    isCredentialEntered: false,
    availableDates: [],
    isAccepting: false,
  },
  reducers: {
    init: (state) => {
      state.newSlot = null;
      // state.isWorking = false;
      state.isStarting = false;
      state.isStopping = false;
      state.isCredentialEntered = false;
      state.availableDates = [];
      state.isAccepting = false;
    },
    acceptSlot: (state) => {
      state.isAccepting = true;
    },
    acceptedSlot: (state) => {
      state.isAccepting = false;
    },
    setAvailableDates: (state, { payload }) => {
      state.availableDates = payload;
      state.newSlot = true;
    },
    enterCredential: (state) => {
      state.isCredentialEntered = false;
    },
    enteredCredential: (state) => {
      state.isCredentialEntered = true;
    },
    alertError: (state, { payload }) => {
      state.errorAlert = payload;
    },
    alertedError: (state) => {
      state.errorAlert = null;
    },
    setIsWorking: (state, { payload }) => {
      state.isWorking = payload;
    },
    starting: (state) => {
      state.isStarting = true;
    },
    start: (state) => {
      state.isStarting = true;
    },
    started: (state) => {
      state.isStarting = false;
      state.isWorking = true;
    },
    stopping: (state) => {
      state.isStopping = true;
    },
    stop: (state) => {
      state.isStopping = true;
    },
    stopped: (state) => {
      state.isStopping = false;
      state.isWorking = false;
    },
    alertedNewSlot: (state) => {
      state.newSlot = false;
    },
  },
});

export const {
  acceptSlot,
  acceptedSlot,
  setAvailableDates,
  enterCredential,
  enteredCredential,
  init,
  alertError,
  alertedError,
  setIsWorking,
  starting,
  start,
  started,
  stopping,
  stop,
  stopped,
  alertedNewSlot,
} = botSlice.actions;
export default botSlice.reducer;
