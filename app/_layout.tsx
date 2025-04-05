import { Stack } from "expo-router";
import "./global.css";
import Navbar from "../components/NavBar";

export default function RootLayout() {
  return (
    <>
    <Navbar/>
    <Stack>
      <Stack.Screen 
      name="(tabs)" 
      options={{ headerShown: false }} />
      <Stack.Screen 
      name="product/[id]" 
      options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
