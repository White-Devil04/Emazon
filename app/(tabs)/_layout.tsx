import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const _Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === 'wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          else iconName = iconName || 'help-circle';
          

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f4b001',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb', 
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
        }}
      />
    </Tabs>
  );
};

export default _Layout;