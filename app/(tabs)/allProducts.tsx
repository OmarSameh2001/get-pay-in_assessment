import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../api/products";
import { setOffline } from "../../store/slices/networkSlice";
import { RootState } from "../../store/store";

export default function AllProductsScreen() {
  const qc = useQueryClient();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const isSuper = useSelector((s: RootState) => s.auth.isSuperadmin);
  const network = useSelector((s: RootState) => s.network.isOffline);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      dispatch(setOffline(!state.isConnected));
    });
    return unsub;
  }, []);

  async function onDelete(id: number) {
    const name = data?.products.find((p: any) => p.id === id)?.title || id;
    Alert.alert(
      "Delete Item?",
      `Are you sure you want to delete this item? ${name}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              // simulate optimistic update: filter out locally
              qc.setQueryData(["products"], (old: any) => {
                if (!old) return old;
                const filtered = {
                  ...old,
                  products: old.products.filter((p: any) => p.id !== id),
                };
                return filtered;
              });
              Toast.show({
                type: "success",
                text1: "Deleted",
                text2: `Product ${name} marked deleted.`,
              });
            } catch (e: any) {
              Alert.alert("Delete failed", e.message || "Error");
            }
          },
        },
      ],
      { cancelable: true }
    );
  }
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
            {isSuper && (
              <Ionicons
                name="trash-bin-outline"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
                onPress={() => onDelete(item.id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
