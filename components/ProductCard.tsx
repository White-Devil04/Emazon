import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const navigateToProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-lg shadow-md p-4 m-2 w-[47%]"
      onPress={navigateToProduct}
    >
      <View className="w-full h-40 bg-gray-50 rounded-lg justify-center items-center overflow-hidden">
        {imageLoading && (
          <ActivityIndicator size="small" color="#f4b001" />
        )}
        
        {!imageError ? (
          <Image
            source={{ uri: product.image }}
            className="w-full h-40"
            resizeMode="contain"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              console.error(`Failed to load image for ${product.title}`);
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <View className="justify-center items-center">
            <Ionicons name="image-outline" size={32} color="#d1d5db" />
            <Text className="text-gray-400 text-xs mt-2">Image unavailable</Text>
          </View>
        )}
      </View>
      
      <Text numberOfLines={2} className="text-base font-bold mt-2 text-gray-800 h-10">
        {product.title}
      </Text>
      
      <Text className="text-secondary mt-1 font-semibold">${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;