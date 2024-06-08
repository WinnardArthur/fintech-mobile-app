import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CryptoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[cryptoId]" options={{ headerShown: true }} />
    </Stack>
  );
};

export default CryptoLayout;
