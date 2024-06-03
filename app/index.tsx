import React from "react";
import { View, Text, Image } from "react-native";

const IndexPage = () => {
  return (
    <View>
      <Text className="text-red-500 text-2xl">IndexPage</Text>

      <Image
        source={require("../assets/videos/intro.gif")}
        style={{ width: 300, height: 300, backgroundColor: "rgba(0,0,0,0.5)" }}
      />

      <Text>IndexPage 3</Text>
    </View>
  );
};

export default IndexPage;
