import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

interface RoundButtonProps {
  text: string;
  icon: typeof Ionicons.defaultProps;
  onPress?: () => void;
}

export const RoundButton = ({ text, icon, onPress }: RoundButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      className="items-center gap-[10]"
      onPress={onPress}
    >
      <View className="w-[55] h-[55] rounded-full bg-light-gray justify-center items-center">
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text className="text-[16px] font-medium text-dark">{text}</Text>
    </TouchableOpacity>
  );
};
