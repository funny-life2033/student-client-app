import { loggedIn, loggingFailed, setDetail } from "../store/authSlice";
import {
  acceptedSlot,
  alertError,
  init as initBot,
  setAvailableDates,
  setIsWorking,
  started,
  starting,
  stopped,
  stopping,
} from "../store/botSlice";

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    console.log(type);

    switch (type) {
      case "auth/login": {
        socket.connect(payload);

        socket.on("student client connect success", (detail) => {
          console.log("student client connect success", detail);
          dispatch(loggedIn(detail));
        });

        socket.on("student client connect failed", (err) => {
          console.log("student client connect failed", err);
          socket.disconnect();
          dispatch(loggingFailed(err));
        });

        socket.on("is working", (isWorking) => {
          dispatch(setIsWorking(isWorking));
        });

        socket.on("wrong credential", (detail) => {
          dispatch(setDetail(detail));
          dispatch(alertError("Wrong Credential!"));
        });

        socket.on("no test centre", () => {
          dispatch(initBot());
          dispatch(
            alertError(
              "No test centre offering car tests can be found using the details entered. Please try again"
            )
          );
        });

        socket.on("student bot start", () => {
          dispatch(starting());
        });

        socket.on("student bot stop", () => {
          dispatch(stopping());
        });

        socket.on("student bot start failed", ({ error, client }) => {
          dispatch(initBot());
          dispatch(setIsWorking(false));
          dispatch(setDetail(client));
          dispatch(alertError(error));
        });

        socket.on("student bot started", () => {
          dispatch(started());
        });

        socket.on("student bot stopped", () => {
          dispatch(stopped());
        });

        socket.on("student bot connect", () => {
          dispatch(initBot());
          dispatch(setIsWorking(false));
        });

        socket.on("student bot disconnect", () => {
          dispatch(initBot());
          dispatch(setIsWorking(false));
        });

        socket.on("available dates", (availableDates) => {
          dispatch(setAvailableDates(availableDates));
          dispatch(acceptedSlot());
        });

        socket.on("student accept slot failed", () => {
          dispatch(alertError("Accepting slot failed"));
        });

        socket.on("candidate detail required", () => {
          dispatch(alertError("Please input your detail to book the slot"));
        });

        socket.on("error alert", (error) => {
          dispatch(alertError(error));
        });

        break;
      }
      case "auth/logout": {
        socket.disconnect();
        dispatch(initBot());
        dispatch(setIsWorking(false));
        break;
      }
      case "auth/setDetail": {
        const { credential } = payload;
        socket.emit("entered credential", credential);
        break;
      }
      case "bot/start": {
        socket.emit("student bot start");
        break;
      }
      case "bot/stop": {
        socket.emit("student bot stop");
        break;
      }
      case "bot/acceptSlot": {
        socket.emit("student accept slot", payload);
      }
      default: {
        break;
      }
    }

    return next(action);
  };
}
