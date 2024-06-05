import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="sign-up"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.gray} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.gray} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Link href="/help" asChild>
                <TouchableOpacity activeOpacity={0.3}>
                  <Ionicons
                    name="help-circle-outline"
                    size={33}
                    color={Colors.gray}
                  />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="verify/[phone]"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={Colors.gray} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
