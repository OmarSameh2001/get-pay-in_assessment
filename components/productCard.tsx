import { Product } from "@/api/products";
import { Image, StyleSheet, Text, View } from "react-native";
import DeleteButton from "./deleteButton";

export interface ProductCardProps {
  product: Product;
  data: Product[];
  colorScheme: string | null | undefined;
  isSuper: boolean;
  isDeletable: boolean;
}

export default function ProductCard({
  product,
  colorScheme,
  isSuper,
  isDeletable,
  data,
}: ProductCardProps) {
    const styles = StyleSheet.create({
        row: {
          flexDirection: "row",
          padding: 12,
          borderWidth: 0.5,
          borderBottomWidth: 0.5,
          alignItems: "center",
          borderColor: colorScheme === "dark" ? "#989898ff" : "#000000ff",
          backgroundColor: colorScheme === "dark" ? "#1c1c1cff" : "#fff",
          margin: 5,
          borderRadius: 15,
          shadowColor: colorScheme === "dark" ? "#ffffffff" : "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,
        },
        thumb: { width: 74, height: 74, borderRadius: 6 },
        off: { backgroundColor: "#c0392b", padding: 6, alignItems: "center" },
      });
  return (
    <View style={styles.row}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumb} />
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text
          numberOfLines={2}
          style={{ color: colorScheme === "dark" ? "white" : "black" }}
        >
          {product.title}
        </Text>
      </View>
      {isSuper && isDeletable && (
        <DeleteButton
          id={product.id}
          data={data || []}
          colorScheme={colorScheme}
        />
      )}
    </View>
  );
}
