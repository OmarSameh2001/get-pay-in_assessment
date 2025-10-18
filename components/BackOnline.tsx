import { RootState } from "@/store/store";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";


// Component that shows "Back online" message when network is restored
const BackOnline = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Back online");

  const isOffline = useSelector((s: RootState) => s.network.isOffline);

  useEffect(() => {
    if (!isOffline) {
      setShow(true);
      setText("Back online");

      const visibleTimer = setTimeout(() => {
        let index = "Back online".length;
        const eraseInterval = setInterval(() => {
          index -= 1;
          if (index >= 0) {
            setText((prev) => prev.slice(0, index));
          } else {
            clearInterval(eraseInterval);
            setShow(false);
          }
        }, 40);
      }, 2000);

      return () => clearTimeout(visibleTimer);
    }
  }, [isOffline]);

  if (!show) return null;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Text style={{ color: "#3eff4e", fontSize: 10 }}>{text}</Text>
      <FontAwesome5 name="wifi" size={14} color="#3eff4e" />
    </View>
  );
};

export default BackOnline;
