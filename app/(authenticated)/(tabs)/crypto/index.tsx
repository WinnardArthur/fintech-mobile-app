import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import {
  listingsData as currentListingsData,
  infoData as currentInfoData,
} from "@/data";
import { ScrollView } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";

const CryptoPage = () => {
  const [listingsData, setListingsData] = useState<typeof currentListingsData>(
    []
  );
  const [infoData, setInfoData] =
    useState<typeof currentInfoData>(currentInfoData);

  const foo = async () => {
    try {
      // const res = await fetch("/api/listings");
      // const data = await res.json();

      setListingsData(currentListingsData);
    } catch (error) {
      console.log({ error });
    }
  };

  useFocusEffect(
    useCallback(() => {
      foo();
    }, [])
  );

  return (
    <ScrollView className="bg-background">
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {listingsData.map((currency) => (
          <Link key={currency.id} href={`/crypto/${currency.id}`} asChild>
            <TouchableOpacity className="flex-row items-center gap-x-[14]">
              <Image
                //   @ts-ignore
                source={{ uri: infoData[currency.id].logo }}
                className="w-[40] h-[40]"
              />
              <View className="flex-1 gap-y-[5]">
                <Text className="font-semibold text-[16px]">
                  {currency.name}
                </Text>
                <Text className="text-gray">{currency.symbol}</Text>
              </View>
              <View className="items-end gap-y-[5]">
                <Text className="font-medium">
                  {currency.quote.EUR.price.toFixed(2)} $
                </Text>
                <View className="flex-row gap-x-1 items-center">
                  <Ionicons
                    name={
                      currency.quote.EUR.percent_change_24h > 0
                        ? "arrow-up"
                        : "arrow-down"
                    }
                    size={16}
                    color={
                      currency.quote.EUR.percent_change_24h > 0
                        ? "green"
                        : "red"
                    }
                  />
                  <Text
                    style={{
                      color:
                        currency.quote.EUR.percent_change_24h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {currency.quote.EUR.percent_change_24h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default CryptoPage;
