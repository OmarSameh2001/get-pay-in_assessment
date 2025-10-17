import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { fetchByCategory } from "../../api/products";

const CATEGORY = "smartphones";

export default function CategoryScreen() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["category", CATEGORY],
    queryFn: () => fetchByCategory(CATEGORY),
  });
  const colorScheme = useColorScheme();
  const network = useSelector((s: RootState) => s.network.isOffline);

  const styles = StyleSheet.create({
    row: {
      flexDirection: "row",
      padding: 12,
      borderBottomWidth: 1,
      alignItems: "center",
      borderColor: colorScheme === "dark" ? "#ccc" : "#000000ff",
    },
    thumb: { width: 64, height: 64, borderRadius: 6 },
    off: { backgroundColor: "#c0392b", padding: 6, alignItems: "center" },
  });
  return (
    <View style={{ flex: 1 }}>
      {network && (
        <View style={styles.off}>
          <Text style={{ color: "#fff" }}>Offline: showing cached data</Text>
        </View>
      )}
      <FlatList
        data={data?.products || []}
        keyExtractor={(i: any) => String(i.id)}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Text
                numberOfLines={2}
                style={{ color: colorScheme === "dark" ? "white" : "black" }}
              >
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
