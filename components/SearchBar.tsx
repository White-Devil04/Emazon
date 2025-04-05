import React from "react";
import { View, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";


interface Props {
  placeholder: string;
  value?: string; 
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder="Search", value, onChangeText}: Props) => {
  return (
    <View className="flex-row items-center bg-gray-100 px-5 py-4">

      <Ionicons name="search" size={20} color="#666666" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-primary"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;