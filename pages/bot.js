import { useEffect } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { alertedNewSlot, start, stop } from "../store/botSlice";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const Bot = ({ displayTimes }) => {
  const dispatch = useDispatch();

  const { newSlot, isWorking, isStarting, isStopping, availableDates } =
    useSelector((state) => state.bot);

  useEffect(() => {
    console.log("availableDates: ", availableDates);
    if (newSlot) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "There are available slots",
        textBody: newSlot,
      });

      dispatch(alertedNewSlot());
    }
  }, [newSlot]);

  const StartStopHandle = () => {
    if (isWorking) {
      dispatch(stop());
    } else {
      dispatch(start());
    }
  };

  return (
    <>
      <Button onPress={StartStopHandle} disabled={isStarting || isStopping}>
        {isStarting
          ? "Starting..."
          : isStopping
          ? "Stopping..."
          : isWorking
          ? "Stop Bot"
          : "Start Bot"}
      </Button>
      {availableDates.map((date, index) => (
        <Button key={index} onPress={() => displayTimes(date)}>
          {date.date}
        </Button>
      ))}
    </>
  );
};

export default Bot;
