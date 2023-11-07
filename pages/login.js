import {
  Button,
  Card,
  HelperText,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const hasErrors = () => {
    return error;
  };

  const loginSubmit = () => {
    dispatch(login({ username, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Cover
          style={styles.cover}
          source={require("../assets/home-back.png")}
        />
        <Card.Content style={styles.content}>
          <TextInput
            mode="outlined"
            theme={{ colors: { primary: error ? "red" : "green" } }}
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
          <HelperText type="error" visible={hasErrors()}>
            {error}
          </HelperText>
          <TextInput
            secureTextEntry
            theme={{ colors: { primary: error ? "red" : "green" } }}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
          />
          <HelperText type="error" visible={hasErrors()}>
            {error}
          </HelperText>

          <Button
            theme={{ colors: { primary: "green" } }}
            mode="contained"
            disabled={isLoading}
            icon={
              isLoading
                ? () => (
                    <ActivityIndicator
                      size={17}
                      animating={true}
                      color="gray"
                    />
                  )
                : "connection"
            }
            onPressOut={loginSubmit}
          >
            {isLoading ? "Connecting.." : "Connect"}
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  content: {
    justifyContent: "center",
  },
  cover: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0)",
  },
});

export default Login;
