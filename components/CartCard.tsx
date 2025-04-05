import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartCardProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

const CartCard = ({ item, onRemove }: CartCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    console.log(`Cart: Image URL for ${item.title}: ${item.image}`);
  }, [item]);

  const confirmRemove = () => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${item.title} from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => onRemove(item.id) }
      ]
    );
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-4 m-2">
      <View className="flex-row justify-between">
        <View className="p-3">
          {imageLoading && (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          
          {!imageError ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 96, height: 96 }}
              resizeMode="contain"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => {
                setImageLoading(false);
                console.log(`Cart: Image loaded for ${item.title}`);
              }}
              onError={(e) => {
                console.error(`Cart: Image error for ${item.title}:`, e.nativeEvent.error);
                setImageError(true);
                setImageLoading(false);
              }}
            />
          ) : (
            <Ionicons name="image-outline" size={30} color="#cccccc" />
          )}
        </View>

        <View className="flex-1 pl-4 justify-center">
          <Text numberOfLines={2} className="text-lg font-bold">{item.title}</Text>
          <Text className="text-secondary mt-2">${item.price}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        className="bg-red-500 rounded-full py-3 px-4 mt-3 flex-row justify-center items-center"
        onPress={confirmRemove}
      >
        <Ionicons name="trash" size={18} color="white" />
        <Text className="text-white ml-2 font-semibold">Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;