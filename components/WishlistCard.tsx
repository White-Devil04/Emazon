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
        
        <View style={{ flex: 1, marginLeft: 12, justifyContent: 'center' }}>
          <Text numberOfLines={2} style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{ color: '#f4b001', marginTop: 4, fontSize: 16 }}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#f4b001', // Secondary color (blue)
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flex: 1,
            marginRight: 8,
            justifyContent: 'center'
          }}
          onPress={() => onView(item.id)}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>View Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            backgroundColor: '#ef4444', // Red color
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flex: 1,
            marginLeft: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => onRemove(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', marginLeft: 4 }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;