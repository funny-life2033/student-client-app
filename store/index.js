import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SocketClient from "../utils/socketClient";
import authSlice from "./authSlice";
import botSlice from "./botSlice";
import socketMiddleware from "../middleware/socketMiddleware";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bot: botSlice,
  },
  middleware: [socketMiddleware(socket), ...getDefaultMiddleware()],
});
