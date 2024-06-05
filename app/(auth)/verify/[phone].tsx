import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  isClerkAPIResponseError,
  useAuth,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const VERIFICATION_CODE_LENGTH = 6;
const CELL_COUNT = 6;

const VerifyPhonePage = () => {
  const [code, setCode] = useState("");

  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === VERIFICATION_CODE_LENGTH) {
      //Verify code
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp?.attemptPhoneNumberVerification({ code });

      await setActive?.({ session: signUp?.createdSessionId });
    } catch (error) {
      console.log("Error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn?.attemptFirstFactor({ strategy: "phone_code", code });

      await setActive?.({ session: signUp?.createdSessionId });
    } catch (error) {
      console.log("Error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View>
              <Text
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View
                className="bg-gray self-center w-[10] h-1"
                key={`separator-${index}`}
              />
            ) : null}
          </Fragment>
        )}
      />

      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink, { marginTop: 20 }]}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default VerifyPhonePage;

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    backgroundColor: Colors.lightGray,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});
