import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const IndexPage = () => {
  return (
    <View className="flex-1 justify-between">
      <StatusBar style="light" />
      <Image
        source={require("../assets/videos/intro.gif")}
        className="w-full h-full bottom-0 bg-black/50 absolute"
      />
      <View className="mt-[80px]">
        <Text className="text-[36px] font-extrabold text-white px-[20]">
          Ready to change the way you make money?
        </Text>
      </View>

      <View className="flex-row gap-5 mb-[60] px-5">
        <Link
          href="/(auth)/login"
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark },
          ]}
        >
          <TouchableOpacity activeOpacity={0.6}>
            <Text className="text-white text-xl font-medium">Login</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href="/(auth)/sign-up"
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: "white" },
          ]}
        >
          <TouchableOpacity activeOpacity={0.6}>
            <Text className="text-xl font-medium">Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default IndexPage;
