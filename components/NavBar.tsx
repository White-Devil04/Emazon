import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Navbar = () => {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
      <Image
        source={require("./../assets/images/icon.png")}
        style={{ width: 24, height: 24 }}
        className="object-contain"
      />


      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={35} color="#666666" />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
