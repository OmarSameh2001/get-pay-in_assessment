import { View } from "@/components/expo/Themed";
import { Image } from "react-native";

export default function Loading() {
  return (
    <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}