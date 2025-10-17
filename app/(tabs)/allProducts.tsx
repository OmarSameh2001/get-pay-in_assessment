import ProductCard from "@/components/productCard";
import NetInfo from "@react-native-community/netinfo";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, Product } from "../../api/products";
import { setOffline } from "../../store/slices/networkSlice";
import { RootState } from "../../store/store";

export default function AllProductsScreen() {
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

  const styles = StyleSheet.create({
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
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            product={item}
            data={data?.products || []}
            colorScheme={colorScheme}
            isSuper={isSuper}
            isDeletable={true} // because this is all products screen
          />
        )}
      />
    </View>
  );
}
