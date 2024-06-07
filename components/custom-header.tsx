import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export const CustomHeader = () => {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <StatusBar style="dark" />
      <View className="bg-transparent flex-row items-center justify-center px-[20] h-[60] gap-[10]">
        <TouchableOpacity className="bg-gray w-[40] h-[40] rounded-[20px] items-center justify-center">
          <Text className="text-white font-medium text-[16px]">JA</Text>
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-light-gray rounded-full justify-center">
          <Ionicons
            name="search"
            size={20}
            color={Colors.dark}
            style={{ padding: 10, paddingRight: 6 }}
          />
          <TextInput
            placeholder="Search"
            className="h-[40] flex-1"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View className="w-[40] h-[40] rounded-full bg-light-gray justify-center items-center">
          <Ionicons name="stats-chart" size={20} color={Colors.dark} />
        </View>
        <View className="w-[40] h-[40] rounded-full bg-light-gray justify-center items-center">
          <Ionicons name="card" size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};
