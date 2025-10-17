import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import Dialog from "react-native-dialog";
import { useDispatch } from "react-redux";
import { unlock } from "../store/slices/lockSlice";

export default function PasscodePrompt({setPasscode}: {setPasscode: (v: boolean) => void}) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();


  const handleSubmit = async () => {
    const saved = await SecureStore.getItemAsync("passcode") || "0000";

    if (input === saved) {
      setPasscode(false);
      dispatch(unlock());
    } else {
      Alert.alert("Wrong passcode");
      setInput("");
      setPasscode(false)
    }
  };

  return (
    <View>
      <Dialog.Container visible={true}>
        <Dialog.Title>Biometric failed</Dialog.Title>
        <Dialog.Description>Enter your passcode</Dialog.Description>
        <Dialog.Input
          secureTextEntry
          value={input}
          onChangeText={setInput}
        />
        <Dialog.Button label="Cancel" onPress={() => setPasscode(false)} />
        <Dialog.Button label="OK" onPress={handleSubmit} />
      </Dialog.Container>
    </View>
  );
}
