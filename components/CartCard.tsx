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
    <View style={{
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      padding: 16,
      margin: 8,
    }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ 
          width: 96, 
          height: 96,
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

        <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center' }}>
          <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#f4b001', marginTop: 8, fontSize: 16 }}>${item.price}</Text>
        </View>
      </View>
      
      {/* Remove Button - Using direct styles instead of className */}
      <TouchableOpacity
        style={{
          backgroundColor: '#ef4444',  // bg-red-500 equivalent
          borderRadius: 9999,         // rounded-full equivalent
          paddingVertical: 12,        // py-3 equivalent
          paddingHorizontal: 16,      // px-4 equivalent
          marginTop: 12,              // mt-3 equivalent
          flexDirection: 'row',       // flex-row
          justifyContent: 'center',   // justify-center
          alignItems: 'center',       // items-center
        }}
        onPress={confirmRemove}
      >
        <Ionicons name="trash" size={18} color="white" />
        <Text style={{ color: 'white', marginLeft: 8, fontWeight: '600' }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;