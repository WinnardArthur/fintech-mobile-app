import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginPage = () => {
  const { signIn } = useSignIn();
  const [credentials, setCredentials] = useState({
    countryCode: "+233",
    phoneNumber: "",
  });

  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  // Handle Sign up
  const handleSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullNumber = `${credentials.countryCode}${credentials.phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => factor.strategy === "phone_code"
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullNumber, signin: "true" },
        });
      } catch (error) {
        console.log("error", JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text className="" style={defaultStyles.header}>
          Welcome back
        </Text>
        <Text>
          Enter your phone number. We will send you a confirmation code there.
        </Text>

        <View className="my-[40] flex-row gap-x-2">
          <TextInput
            placeholder="Country code"
            keyboardType="numeric"
            className="bg-neutral-200 block w-24 p-[18] rounded-[16px] text-[20px]"
            placeholderTextColor={Colors.gray}
            value={credentials.countryCode}
          />
          <TextInput
            placeholder="Mobile number"
            keyboardType="numeric"
            className="bg-neutral-200 flex-1 p-[18] rounded-[16px] text-[20px]"
            placeholderTextColor={Colors.gray}
            value={credentials.phoneNumber}
            onChangeText={(e) =>
              setCredentials((prev) => ({ ...prev, phoneNumber: e }))
            }
          />
        </View>

        <TouchableOpacity
          style={[defaultStyles.pillButton]}
          className={`${
            !!credentials.phoneNumber
              ? "bg-primary"
              : "bg-primary-muted text-black"
          }`}
          disabled={!credentials.phoneNumber}
          activeOpacity={0.7}
          onPress={() => handleSignIn(SignInType.Phone)}
        >
          <Text style={[defaultStyles.buttonText]}>Continue</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-[16] mt-[20]">
          <View className="flex-1 h-[0.5px] bg-gray" />
          <Text className="text-gray text-[20px]">or</Text>
          <View className="flex-1 h-[0.5px] bg-gray" />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSignIn(SignInType.Email)}
          style={defaultStyles.pillButton}
          className="flex-row gap-x-[16] mt-[20] bg-white"
        >
          <Ionicons name="mail" size={24} color={Colors.gray} />
          <Text style={[defaultStyles.buttonText, { color: Colors.gray }]}>
            Continue with email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSignIn(SignInType.Google)}
          style={defaultStyles.pillButton}
          className="flex-row gap-x-[16] mt-[20] bg-white"
        >
          <Ionicons name="logo-google" size={24} color={Colors.gray} />
          <Text style={[defaultStyles.buttonText, { color: Colors.gray }]}>
            Continue with google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSignIn(SignInType.Google)}
          style={defaultStyles.pillButton}
          className="flex-row gap-x-[16] mt-[20] bg-white"
        >
          <Ionicons name="logo-apple" size={24} color={Colors.gray} />
          <Text style={[defaultStyles.buttonText, { color: Colors.gray }]}>
            Continue with apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
