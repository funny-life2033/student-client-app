import { io } from "socket.io-client";
import { WEB_SOCKET_HOST } from "./config";

export default class SocketClient {
  socket;
  credential;

  connect({ username, password }) {
    console.log("start connecting..");

    try {
      this.socket = io(WEB_SOCKET_HOST, {
        transports: ["websocket"],
      });
      this.credential = { username, password };

      this.socket.on("error", (e) => {
        console.log("error: ", e);
      });

      this.socket.on("connect_error", (e) => {
        console.log("connect_error: ", e);
      });

      this.socket.on("disconnect", (e) => {
        console.log("disconnected: ", e);
        if (!this.credential) this.socket = null;
      });
    } catch (error) {
      console.log(error);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.credential = null;
    }
  }

  emit(eventName, func) {
    if (this.socket) {
      this.socket.emit(eventName, func);
    }
  }

  on(eventName, func) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
