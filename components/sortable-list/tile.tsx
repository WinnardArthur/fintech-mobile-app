import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MARGIN, SIZE } from "./config";
import { balanceStore } from "@/store/balance-store";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = balanceStore();

  if (id === "spent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text className="text-gray font-medium text-[16px]">
          Spent this month
        </Text>
        <Text className="text-dark font-bold text-[26px] pt-[10]">1024$</Text>
      </View>
    );
  }

  if (id === "cashback") {
    return (
      <View
        style={styles.container}
        className="items-center justify-center"
        pointerEvents="none"
      >
        <View className="items-center justify-center gap-[10]">
          <View>
            <Text className="text-white font-bold text-[18px]">5%</Text>
          </View>
          <Text className="text-gray font-bold text-[18px]">Cashback</Text>
        </View>
      </View>
    );
  }

  if (id === "recent") {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <Text className="text-gray font-medium text-[16px]">
            Recent transaction
          </Text>

          {transactions.length === 0 && (
            <Text className="text-gray font-bold text-[18px] pt-[10]">
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text className="text-dark font-bold text-[18px] py-[10]">
                {transactions[transactions.length - 1].amount}$
              </Text>
              <Text className="text-dark font-bold text-[16px] py-[10]">
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === "cards") {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text className="text-gray font-medium text-[16px]">Cards</Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryMuted}
          style={{ marginTop: 20, alignSelf: "center" }}
        />
      </View>
    );
  }
};

export default Tile;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: 150,
    backgroundColor: "white",
    elevation: 1,
    padding: 14,
  },
});
