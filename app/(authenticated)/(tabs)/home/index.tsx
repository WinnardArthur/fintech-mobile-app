import { View, Text, ScrollView } from "react-native";
import React from "react";
import { RoundButton } from "@/components/round-button";
import { Dropdown } from "@/components/ui/dropdown";
import { balanceStore } from "@/store/balance-store";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import WidgetList from "@/components/sortable-list/widget-list";
import { useHeaderHeight } from "@react-navigation/elements";

const Homepage = () => {
  const headerHeight = useHeaderHeight();
  const { balance, runTransaction, transactions, clearTransactions } =
    balanceStore();

  // Add money function
  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  return (
    <ScrollView
      className=""
      contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 60 }}
    >
      <View className="m-[80] items-center">
        <View className="flex-row items-baseline justify-center gap-[10]">
          <Text className="text-[60px] font-bold">{balance()}</Text>
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
        <RoundButton
          icon={"refresh"}
          text="Exchange"
          onPress={clearTransactions}
        />
        <RoundButton icon={"list"} text="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View className="mx-[20] p-[14] bg-white rounded-[16px]">
        {transactions.length === 0 && (
          <Text className="text-gray mx-[20]">No transactions yet</Text>
        )}
        <View className="gap-y-4">
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              className="flex-row items-center gap-x-[20]"
            >
              <View className="w-[40] h-[40] rounded-full bg-light-gray justify-center items-center">
                <Ionicons
                  name={transaction.amount > 0 ? "add" : "remove"}
                  size={22}
                  color={Colors.dark}
                />
              </View>
              <View className="flex-1">
                <Text className="font-normal">{transaction.title}</Text>
                <Text className="text-gray text-[12px]">
                  {transaction.date.toLocaleString()}
                </Text>
              </View>
              <Text>{transaction.amount}$</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Homepage;
