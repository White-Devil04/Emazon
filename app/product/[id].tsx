import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchProducts } from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetails = () => {
  const { id } = useLocalSearchParams(); 
  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const router = useRouter(); 


  useEffect(() => {
      
      loadProduct();
    }, [id]);
    
const loadProduct = async () => {
  try {
    const data: Product[] = await fetchProducts(); 
    const selectedProduct = data.find((item) => item.id === parseInt(id as string));
    setProduct(selectedProduct || null); 
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    setLoading(false);
  }
};
  const addToCart = async () => {
    try {
      const cartRaw = await AsyncStorage.getItem("cart"); 
      const cart: Product[] = cartRaw ? JSON.parse(cartRaw) : [];
      if (product) {
        cart.push(product);
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToWishlist = async () => {
    try {
      const wishlistRaw = await AsyncStorage.getItem("wishlist");
      const wishlist: Product[] = wishlistRaw ? JSON.parse(wishlistRaw) : [];
      

      if (!wishlist.some(item => item.id === product?.id) && product) {
        wishlist.push(product);
        await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Added to wishlist!");
      } else {
        alert("Already in wishlist!");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Loading product details...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Product not found!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
        <StatusBar barStyle="dark-content" />
      

      <View className="py-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-1 mr-2"
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Product Details</Text>
      </View>

        <ScrollView showsVerticalScrollIndicator={false}>
    <Image
      source={{ uri: product.image }}
      className="w-full h-60 rounded-lg"
      resizeMode="contain"
    />
    <Text className="text-2xl font-bold mt-4">{product.title}</Text>
    <Text className="text-lg text-gray-600 mt-2">{product.description}</Text>
    <Text className="text-xl text-secondary mt-4">${product.price}</Text>
    
    <View className="flex-row mt-6 space-x-3">
      <TouchableOpacity
        className="flex-1 bg-secondary rounded-full py-3 mr-2"
        onPress={addToCart}
      >
        <Text className="text-white text-center font-bold">Add to Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="flex-1 bg-white border-2 border-secondary rounded-full py-3"
        onPress={addToWishlist}
      >
        <Text className="text-secondary text-center font-bold">Wishlist</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </View>
  );
};

export default ProductDetails;