import { RootState } from "@/store/store";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useBiometric from "../hooks/useBiometric";
import { unlock } from "../store/slices/lockSlice";
import PasscodePrompt from "./PasscodePrompt";
export default function LockOverlay() {
  const dispatch = useDispatch();
  const token = useSelector((s: RootState) => s.auth.token);

  const [passcode, setPasscode] = React.useState<boolean>(false);
  console.log("Rendering LockOverlay");
  const biometric = async () => {
    console.log("Starting biometric auth");
    useBiometric({
      message: "Unlock app",
      success: () => {
        console.log("biometric success");
        dispatch(unlock());
      },
      failure: () => {
        console.log("Biometric failed");
        setPasscode(true);
      },
      noBio: () => {
        Alert.alert("No biometric hardware");
        setPasscode(true);
      },
    });
  };

  return (
    <View style={styles.overlay}>
      <Text style={styles.text} disabled={passcode} onPress={() => biometric()}>
        Locked — unlock with biometrics
      </Text>
      <Entypo
            name="fingerprint"
            size={35}
            color={"white"}
            onPress={() => biometric()}
          />
      {passcode && <PasscodePrompt setPasscode={setPasscode} />}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  text: { color: "#fff", fontSize: 18, padding: 12 },
});
