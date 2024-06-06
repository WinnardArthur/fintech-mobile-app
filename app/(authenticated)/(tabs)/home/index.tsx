import { View, Text, ScrollView } from "react-native";
import React from "react";
import { RoundButton } from "@/components/round-button";
import { Dropdown } from "@/components/ui/dropdown";

const balance = 1820;

const Homepage = () => {
  const onAddMoney = () => {};
  return (
    <ScrollView className="">
      <View className="m-[80] items-center">
        <View className="flex-row items-baseline justify-center gap-[10]">
          <Text className="text-[60px] font-bold">{balance}</Text>
          <Text className="text-[30px] font-semibold">$</Text>
        </View>
      </View>

      <View className="flex-row justify-between p-[20] gap-x-[10]">
        <RoundButton
          icon={"add"}
          text="Add money"
          onPress={() => {
            onAddMoney();
          }}
        />
        <RoundButton icon={"refresh"} text="Exchange" />
        <RoundButton icon={"list"} text="Details" />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

export default Homepage;
