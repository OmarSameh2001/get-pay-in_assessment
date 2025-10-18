import { Product } from "@/api/products";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

// A component to remove the deletion logic from ProductCard and make it reusable
interface DeleteButtonProps {
  id: number;
  data: Product[];
  colorScheme: string | null | undefined;
}
export default function DeleteButton({
  id,
  data,
  colorScheme,
}: DeleteButtonProps) {
  const qc = useQueryClient();
  async function onDelete(id: number) {
    const name = data?.find((p: any) => p.id === id)?.title || id;
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
  return (
    <Ionicons
      name="trash-bin-outline"
      size={24}
      color={colorScheme === "dark" ? "white" : "black"}
      onPress={() => onDelete(id)}
    />
  );
}
