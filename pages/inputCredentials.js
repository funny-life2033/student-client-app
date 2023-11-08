import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
} from "react-native-paper";
import { Axios } from "../utils/config";
import { useDispatch } from "react-redux";
import { setDetail } from "../store/authSlice";

const InputCredentials = ({ detail, enteredCredential }) => {
  const { username, credential } = detail;
  const dispatch = useDispatch();

  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [drivingTestReferenceNumber, setDrivingTestReferenceNumber] =
    useState("");
  const [theoryTestPassNumber, setTheoryTestPassNumber] = useState("");
  const [testCentre, setTestCentre] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (credential) {
      setDrivingLicenseNumber(credential.drivingLicenseNumber);
      setDrivingTestReferenceNumber(credential.drivingTestReferenceNumber);
      setTheoryTestPassNumber(credential.theoryTestPassNumber);
      setTestCentre(credential.testCentre);
    } else {
      setDrivingLicenseNumber("");
      setDrivingTestReferenceNumber("");
      setTheoryTestPassNumber("");
      setTestCentre("");
    }
  }, [JSON.stringify(credential)]);

  const hasErrors = () => {
    return error;
  };

  const enterCredential = async () => {
    setIsLoading(true);
    if (
      drivingLicenseNumber !== credential.drivingLicenseNumber ||
      drivingTestReferenceNumber !== credential.drivingTestReferenceNumber ||
      theoryTestPassNumber !== credential.theoryTestPassNumber ||
      testCentre !== credential.testCentre
    ) {
      try {
        const { data } = await Axios.post("/studentClient/enterCredential", {
          username,
          drivingLicenseNumber,
          drivingTestReferenceNumber,
          theoryTestPassNumber,
          testCentre,
        });
        setIsLoading(false);
        if (data.client) {
          dispatch(setDetail(data.client));
        } else {
          setError("The username is not regitered yet");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError("Server Error");
      }
    }

    enteredCredential();
  };

  return (
    <>
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: error ? "red" : "green" } }}
        label="Driving License Number"
        value={drivingLicenseNumber}
        onChangeText={setDrivingLicenseNumber}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: error ? "red" : "green" } }}
        label="Driving Test Reference Number"
        value={drivingTestReferenceNumber}
        onChangeText={setDrivingTestReferenceNumber}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: error ? "red" : "green" } }}
        label="Theory Test Pass Number"
        value={theoryTestPassNumber}
        onChangeText={setTheoryTestPassNumber}
      />
      <HelperText type="error" visible={hasErrors()}>
        {error}
      </HelperText>
      <TextInput
        mode="outlined"
        theme={{ colors: { primary: error ? "red" : "green" } }}
        label="Test Centre"
        value={testCentre}
        onChangeText={setTestCentre}
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
                <ActivityIndicator size={17} animating={true} color="gray" />
              )
            : "account-details"
        }
        onPress={enterCredential}
      >
        {isLoading ? "Entering.." : "Enter Detail"}
      </Button>
    </>
  );
};

export default InputCredentials;
