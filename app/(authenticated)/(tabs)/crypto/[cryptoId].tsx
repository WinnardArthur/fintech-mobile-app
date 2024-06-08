import {
  View,
  Text,
  ScrollView,
  SectionList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/constants/Styles";
import {
  listingsData as currentListingsData,
  infoData as currentInfoData,
} from "@/data";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { CartesianChart, Line } from "victory-native";

const categories = ["Overview", "News", "Orders", "Transactions"];

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}));

const CryptoDetailsPage = () => {
  const { cryptoId } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const info = currentListingsData.find(
    (listing) => String(listing.id) === cryptoId
  );

  // @ts-ignore
  const logo = currentInfoData?.[cryptoId]?.logo;

  return (
    <>
      <SectionList
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: headerHeight }}
        keyExtractor={(item) => item.title}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={() => (
          <>
            <View className="mx-[16] mb-[20]">
              <Text className="text-3xl font-semibold">{info?.name}</Text>
              <View className="flex-row justify-between">
                <Text className="text-gray mt-2">{info?.symbol}</Text>
                <Image source={{ uri: logo }} className="w-[60] h-[60]" />
              </View>

              <View className="flex-row gap-x-[10] my-[12]">
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="flex-row gap-x-[2] pr-[28px] pl-4 bg-primary"
                  style={defaultStyles.pillButtonSmall}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                  <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="flex-row gap-x-[4] pr-4 pl-2 bg-primary-muted"
                  style={defaultStyles.pillButtonSmall}
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={Colors.primary}
                  />
                  <Text
                    style={[
                      defaultStyles.buttonText,
                      { color: Colors.primary },
                    ]}
                  >
                    Receive
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        renderSectionHeader={() => (
          <ScrollView
            horizontal
            contentContainerStyle={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingBottom: 8,
              marginBottom: 10,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.primary,
              borderBottomWidth: 1,
            }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                className={`p-[10] px-[14] items-center justify-center rounded-full`}
                style={{
                  backgroundColor:
                    activeCategory === category ? "white" : Colors.background,
                }}
                key={category}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  className="text-[14px]"
                  style={{
                    color: activeCategory === category ? "black" : Colors.gray,
                  }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        renderItem={(item) => (
          <>
            {/* Chart */}
            <View className="h-[500] bg-green-500">
              <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
                {({ points }) => (
                  // 👇 and we'll use the Line component to render a line path.
                  <Line points={points.highTmp} color="red" strokeWidth={3} />
                )}
              </CartesianChart>
            </View>
            <View style={[defaultStyles.block, { marginBottom: 100 }]}>
              <Text className="text-[22px] font-bold text-gray">Overview</Text>
              <Text className="text-gray">
                Bitcoin uses peer-to-peer technology to operate with no central
                authority or banks; managing transactions and the issuing of
                bitcoins is carried out collectively by the network. Bitcoin is
                open-source; its design is public, nobody owns or controls
                Bitcoin and everyone can take part. Through many of its unique
                properties, Bitcoin allows exciting uses that could not be
                covered by any previous payment system.
              </Text>
            </View>
          </>
        )}
        sections={[{ data: [{ title: "Chart" }] }]}
      ></SectionList>
    </>
  );
};

export default CryptoDetailsPage;
