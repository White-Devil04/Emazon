import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
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
  
  // Calculate card width to make them exactly the same size
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 32) / 2; // 32 accounts for outer padding (16 on each side)

  const navigateToProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        padding: 12,
        margin: 4,
        width: cardWidth,
        height: 280, // Fixed height for all cards
      }}
      onPress={navigateToProduct}
    >
      {/* Image Container */}
      <View style={{
        width: '100%',
        height: 160,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 8
      }}>
        {imageLoading && (
          <ActivityIndicator size="small" color="#f4b001" />
        )}
        
        {!imageError ? (
          <Image
            source={{ uri: product.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="image-outline" size={32} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 4 }}>Image unavailable</Text>
          </View>
        )}
      </View>
      
      {/* Title - Fixed height */}
      <View style={{ height: 40, marginBottom: 4 }}>
        <Text 
          numberOfLines={2} 
          style={{ fontSize: 14, fontWeight: 'bold', color: '#333333' }}
        >
          {product.title}
        </Text>
      </View>
      
      {/* Price - Fixed position at bottom */}
      <Text style={{ 
        color: '#f4b001', 
        marginTop: 'auto', 
        fontWeight: '600',
        fontSize: 16
      }}>
        ${product.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCard;