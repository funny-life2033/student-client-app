import { useDispatch, useSelector } from "react-redux";
import Bot from "./bot";
import Login from "./login";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import InputCredentials from "./inputCredentials";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Dialog, Surface, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { logout } from "../store/authSlice";
import { useEffect, useState } from "react";
import {
  acceptSlot,
  alertedError,
  enterCredential,
  enteredCredential,
} from "../store/botSlice";

const Pages = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, detail } = useSelector((state) => state.auth);
  const { errorAlert, isCredentialEntered, availableDates } = useSelector(
    (state) => state.bot
  );

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedDate, selectDate] = useState(null);

  const disconnect = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (errorAlert) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Error!",
        textBody: errorAlert,
      });

      dispatch(alertedError());
    }
  }, [errorAlert, dispatch]);

  useEffect(() => {
    setDialogVisible(false);
  }, [availableDates]);

  const displayTimes = (date) => {
    selectDate(date);
    setDialogVisible(true);
  };

  const accept = (time) => {
    dispatch(
      acceptSlot({
        date: selectedDate.date,
        time: time.time,
      })
    );
    setDialogVisible(false);
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView>
        {isLoggedIn ? (
          <>
            <Appbar.Header dark theme={{ colors: { surface: "green" } }}>
              <Appbar.BackAction onPress={disconnect} />
              <Appbar.Content
                title={
                  isCredentialEntered
                    ? `${detail.credential.testCentre}`
                    : "Input your credential"
                }
              />
              {isCredentialEntered ? (
                <Appbar.Action
                  icon="swap-horizontal"
                  onPress={() => dispatch(enterCredential())}
                />
              ) : (
                ""
              )}
            </Appbar.Header>
            <ScrollView>
              <View style={styles.bodyContainer}>
                {isCredentialEntered ? (
                  <Bot
                    enterCredential={() => dispatch(enterCredential())}
                    displayTimes={displayTimes}
                  />
                ) : (
                  <InputCredentials
                    detail={detail}
                    enteredCredential={() => dispatch(enteredCredential())}
                  />
                )}
              </View>
            </ScrollView>
            <Dialog
              visible={dialogVisible}
              onDismiss={() => setDialogVisible(false)}
            >
              <Dialog.Title>Times</Dialog.Title>
              <Dialog.Content>
                {selectedDate?.times.map((time) => (
                  <Surface
                    key={time.time}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Text>
                      {time.time}: {time.price}
                    </Text>
                    <Button onPress={() => accept(time)}>Accept</Button>
                  </Surface>
                ))}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialogVisible(false)}>close</Button>
              </Dialog.Actions>
            </Dialog>
          </>
        ) : (
          <Login />
        )}
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    padding: 10,
    paddingBottom: 100,
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default Pages;
