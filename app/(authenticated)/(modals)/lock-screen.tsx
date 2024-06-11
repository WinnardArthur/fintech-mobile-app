import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { router } from "expo-router";

const LockScreenPage = () => {
  const { user } = useUser();
  const [code, setCode] = useState<(number | string)[]>([]);

  const [firstName, setFirstName] = useState(user?.firstName);

  const codeLength = Array(6).fill(undefined);

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "123456") {
        router.replace("/home");
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
      setCode([]);
    }
  }, [code]);

  const handleNumberPress = (number: number | string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const handleBackspacePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const handleBiometricAuth = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();

    if (success) {
      router.replace("/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView>
      <Text className="text-[24px] font-bold mt-[80] self-center">
        Welcome back, {firstName || "Guest"}
      </Text>
      <View style={{}} className="flex-row justify-center gap-x-[20] my-[80]">
        {codeLength.map((_, index) => (
          <View
            key={index}
            className="w-[20] h-[20] rounded-full"
            style={{
              backgroundColor: code[index] ? Colors.primary : Colors.lightGray,
            }}
          />
        ))}
      </View>

      <View className="px-[70] gap-x-[6] gap-y-[42]">
        <View className="flex-row justify-between">
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => handleNumberPress(number)}
            >
              <Text className="text-[32px]">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between">
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => handleNumberPress(number)}
            >
              <Text className="text-[32px]">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between">
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => handleNumberPress(number)}
            >
              <Text className="text-[32px]">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => handleBiometricAuth()}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={26}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("0")}>
            <Text className="text-[32px]">0</Text>
          </TouchableOpacity>

          <View className="min-w-[30]">
            {code.length > 0 && (
              <TouchableOpacity onPress={() => handleBackspacePress()}>
                <MaterialCommunityIcons
                  name="backspace"
                  size={26}
                  color="black"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="self-center text-primary font-medium text-[16px]">
          Forgot your passcode?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LockScreenPage;
