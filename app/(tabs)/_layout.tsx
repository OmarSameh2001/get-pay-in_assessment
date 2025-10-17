import { Tabs } from "expo-router";
import React from "react";
import { Alert, Image, View } from "react-native";

import BackOnline from "@/components/BackOnline";
import LockOverlay from "@/components/LockOverlay";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import useAutoLock from "@/hooks/useAutoLock";
import { clearCredentials } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  useAutoLock();
  const isLocked = useSelector((s: RootState) => s.lock.isLocked);

  const dispatch = useDispatch();

  async function doSignOut() {
    Alert.alert(
      "Logout?",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            Toast.show({
              type: "success",
              text1: "Signed out",
              text2: "You have successfully signed out.",
            });
            dispatch(clearCredentials());
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
          headerRight: () => (
            <View
              style={{
                marginRight: 8,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
            >
              <BackOnline />
              <MaterialIcons
                name="logout"
                size={24}
                color="red"
                onPress={doSignOut}
              />
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="allProducts"
          options={{
            title: "All Products",
            tabBarIcon: () => (
              <View>
                <Image
                  source={{
                    uri: "https://thumbs.dreamstime.com/b/product-icon-design-vector-illustration-digital-marketing-324810108.jpg",
                  }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="category"
          options={{
            title: "Smartphones",
            tabBarIcon: () => (
              <View>
                <Image
                  source={{
                    uri: "https://thumbs.dreamstime.com/b/human-hand-holding-smartphone-icon-phone-flat-sign-click-finger-stock-vector-150023049.jpg",
                  }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            ),
          }}
        />
      </Tabs>

      {isLocked && <LockOverlay />}
    </View>
  );
}
