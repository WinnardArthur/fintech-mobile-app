import { View, Text } from "react-native";
import React from "react";
import { Tabs, useSegments } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { CustomHeader } from "@/components/custom-header";

const TabsLayout = () => {
  const segments = useSegments();

  const isCryptoIdPage = segments.includes("[cryptoId]");

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarActiveTintColor: Colors.primary,
          tabBarBackground: () => (
            <BlurView
              intensity={120}
              tint="extraLight"
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}
            />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
            display: isCryptoIdPage ? "none" : "flex",
          },
        };
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="invest/invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerShown: !isCryptoIdPage,
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
