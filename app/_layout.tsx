import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { persister, queryClient } from "@/components/queryClient";
import { useColorScheme } from "@/components/useColorScheme";
import { RootState, store } from "@/store/store";
import Toast from "react-native-toast-message";
import { Provider, useSelector } from "react-redux";
import LoginScreen from "./login";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <RootLayoutNav />
        <Toast position="top" topOffset={50} visibilityTime={2000} />
      </PersistQueryClientProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const token = useSelector((s: RootState) => s.auth.token);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {token ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "" }}
          />
          
          <Stack.Screen
            name="loading"
            options={{ headerShown: false, title: "" }}
          />
        </Stack>
      ) : (
        <LoginScreen />
      )}
    </ThemeProvider>
  );
}
