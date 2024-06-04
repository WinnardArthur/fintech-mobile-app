import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const SignUpPage = () => {
  const [credentials, setCredentials] = useState({
    countryCode: "+233",
    phoneNumber: "",
  });

  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  // Handle Sign up
  const handleSignUp = () => {};

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text className="" style={defaultStyles.header}>
          Let's get started!
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

        <Link href="/login" asChild replace>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              style={defaultStyles.textLink}
              className="text-center opacity-80"
            >
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={[defaultStyles.pillButton]}
          className={`mt-auto ${
            !!credentials.phoneNumber ? "bg-primary" : "bg-primary-muted"
          }`}
          disabled={!credentials.phoneNumber}
          activeOpacity={0.7}
          onPress={handleSignUp}
        >
          <Text style={[defaultStyles.buttonText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;
