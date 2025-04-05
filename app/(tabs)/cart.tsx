import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CartCard from "../../components/CartCard";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  const loadCart = async () => {
    try {
      const storedCartRaw = await AsyncStorage.getItem("cart");
      const storedCart = storedCartRaw ? JSON.parse(storedCartRaw) : [];
      
      const uniqueCart = removeDuplicates(storedCart);
      
      if (uniqueCart.length !== storedCart.length) {
        await AsyncStorage.setItem("cart", JSON.stringify(uniqueCart));
      }
      
      setCart(uniqueCart);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeDuplicates = (cartItems: CartItem[]): CartItem[] => {
    const uniqueIds = new Set();
    return cartItems.filter(item => {
      if (uniqueIds.has(item.id)) {
        return false; 
      }
      uniqueIds.add(item.id);
      return true;
    });
  };

  const calculateTotal = (): string => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Loading cart...</Text>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Ionicons name="cart-outline" size={64} color="#cccccc" />
        <Text className="text-lg text-gray-500 mt-4">Your cart is empty!</Text>
        <Text className="text-sm text-gray-400 mt-2">Add some items to get started</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartCard item={item} onRemove={removeFromCart} />}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
      />
      
      <View className="bg-white rounded-lg shadow-md p-4 mt-4">
        <Text className="text-xl font-bold">Total: ${calculateTotal()}</Text>
        <TouchableOpacity className="bg-secondary rounded-full py-3 mt-3">
          <Text className="text-white text-center font-bold">Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;