import { login } from "@/api/auth";
import useBiometric from "@/hooks/useBiometric";
import { setCredentials } from "@/store/slices/authSlice";
import Entypo from "@expo/vector-icons/Entypo";
import { navigate } from "expo-router/build/global-state/routing";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

export default function LoginScreen() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [isCred, setIsCred] = useState(false);
  const dispatch = useDispatch();
  const cs = useColorScheme();

  async function onLogin() {
    try {
      setLoading(true);
      const data = await login(username, password);
      const token = data.accessToken;
      await SecureStore.setItemAsync("accessToken", token);
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("id", String(data.id));
      loginSuccess({ token, username, id: data.id });
      setLoading(false);
    } catch (e: any) {
      Alert.alert("Login failed", e.message || "Error");
      setLoading(false);
    }
  }

  async function preformBiometricLogin() {
    useBiometric({
      message: "Login with Biometrics",
      success: async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const username = await SecureStore.getItemAsync("username");
        const id = await SecureStore.getItemAsync("id");

        if (token && username && id) {
          loginSuccess({ token, username, id: Number(id) });
        } else {
          Alert.alert("No credentials", "Please login with username/password");
        }
      },
      failure: () => {
        Alert.alert("Biometric failed");
      },
      noBio: () => {
        Alert.alert("No biometric hardware");
      },
    });
  }

  function loginSuccess({
    token,
    username,
    id,
  }: {
    token: string;
    username: string;
    id: number;
  }) {
    dispatch(setCredentials({ user: { accessToken: token, username, id } }));
    Toast.show({
      type: "success",
      text1: "Welcome back!",
      text2: "You have successfully logged in.",
    });
    navigate("/(tabs)/allProducts");
  }

  useEffect(() => {
    const checkCredentials = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");
        const username = await SecureStore.getItemAsync("username");
        const id = await SecureStore.getItemAsync("id");

        if (token && username && id) {
          setIsCred(true);
        }
      } catch (err) {
        console.error("Error reading secure store:", err);
      }
    };

    checkCredentials();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: cs === "dark" ? "#000" : "#fff",
    },
    title: {
      fontSize: 22,
      marginBottom: 12,
      textAlign: "center",
      color: cs === "dark" ? "#fff" : "#000",
    },
    inputText: {
      color: cs === "dark" ? "#fff" : "#000",
      fontSize: 12,
      marginLeft: 4,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      marginBottom: 12,
      borderRadius: 6,
      color: cs === "dark" ? "#fff" : "#000",
      borderColor: cs === "dark" ? "#555" : "#ccc",
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Text style={styles.title}>GetPayIn — Login</Text>
      <Text style={styles.inputText}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder="username"
      />
      <Text style={styles.inputText}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="password"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 25,
          width: "100%",
        }}
      >
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={onLogin}
          disabled={loading}
        />
        {isCred && (
          <Entypo
            name="fingerprint"
            size={35}
            color={cs === "dark" ? "white" : "black"}
            onPress={() => preformBiometricLogin()}
          />
        )}
      </View>
    </View>
  );
}
