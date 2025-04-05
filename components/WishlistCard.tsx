import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistCardProps {
  item: Product;
  onRemove: (id: number) => void;
  onView: (id: number) => void;
}

const WishlistCard = ({ item, onRemove, onView }: WishlistCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Debug image URL
  useEffect(() => {
    console.log(`Image URL for ${item.title}: ${item.image}`);
  }, [item]);

  return (
    <View className="bg-white rounded-lg shadow-md p-4 m-2">
      <View className="flex-row">
        {/* Image container with explicit styling */}
        <View style={{ 
          width: 80, 
          height: 80, 
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          {imageLoading && (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          
          {!imageError ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => {
                setImageLoading(false);
                console.log(`Image loaded for ${item.title}`);
              }}
              onError={(e) => {
                console.error(`Image error for ${item.title}:`, e.nativeEvent.error);
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <Ionicons name="image-outline" size={30} color="#cccccc" />
          )}
        </View>
        
        <View className="flex-1 ml-3 justify-center">
          <Text className="text-lg font-bold" numberOfLines={2}>{item.title}</Text>
          <Text className="text-secondary mt-1">${item.price}</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-secondary rounded-lg py-3 px-4 flex-1 mr-2"
          onPress={() => onView(item.id)}
        >
          <Text className="text-white text-center font-bold">View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-red-500 rounded-lg py-3 px-4 flex-1 ml-2 flex-row justify-center items-center"
          onPress={() => onRemove(item.id)}
        >
          <Ionicons name="trash" size={18} color="white" />
          <Text className="text-white text-center font-bold ml-1">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;