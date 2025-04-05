import React, {useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import WishlistCard from "../../components/WishlistCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadWishlist();
    }, []) // Using empty dependency array to only run on focus
  );

  const loadWishlist = async () => {
    try {
      const storedWishlistRaw = await AsyncStorage.getItem("wishlist");
      const storedWishlist = storedWishlistRaw ? JSON.parse(storedWishlistRaw) : [];
      setWishlist(storedWishlist);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: number) => {
    try {
      const updatedWishlist = wishlist.filter(item => item.id !== id);
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const navigateToProduct = (id: number) => {
    router.push(`/product/${id}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Loading wishlist...</Text>
      </View>
    );
  }

  if (wishlist.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Ionicons name="heart-outline" size={64} color="#cccccc" />
        <Text className="text-lg text-gray-500 mt-4">Your wishlist is empty!</Text>
        <Text className="text-sm text-gray-400 mt-2">Add items you like to your wishlist</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WishlistCard 
            item={item} 
            onRemove={removeFromWishlist} 
            onView={navigateToProduct}
          />
        )}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wishlist;