import {
  View,
  Text,
  ScrollView,
  SectionList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import dayjs from "dayjs";
import * as Haptics from "expo-haptics";
import type { SharedValue } from "react-native-reanimated";

import { defaultStyles } from "@/constants/Styles";
import {
  listingsData as currentListingsData,
  infoData as currentInfoData,
  tickersData,
} from "@/data";
import Colors from "@/constants/Colors";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const categories = ["Overview", "News", "Orders", "Transactions"];

Animated.addWhitelistedNativeProps({ text: true });

const Tooltip = ({
  x,
  y,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
}) => {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CryptoDetailsPage = () => {
  const { cryptoId } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const { state, isActive } = useChartPressState({ x: "0", y: { price: 0 } });

  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} $`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);

    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  useEffect(() => {
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

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
          <View className="space-y-10">
            {/* Chart */}
            <View className="h-[500]" style={defaultStyles.block}>
              {!isActive && (
                <View>
                  <Text className="text-[30px] font-bold text-dark">
                    {tickersData[tickersData.length - 1].price.toFixed(2)} $
                  </Text>
                  <Text className="text-[16px] text-gray">Today</Text>
                </View>
              )}
              {isActive && (
                <View>
                  <AnimatedTextInput
                    editable={false}
                    className="text-[36px] font-bold text-dark"
                    animatedProps={animatedText}
                  ></AnimatedTextInput>
                  <AnimatedTextInput
                    editable={false}
                    className="text-[18px] text-gray"
                    animatedProps={animatedDateText}
                  ></AnimatedTextInput>
                </View>
              )}
              <CartesianChart
                chartPressState={state}
                axisOptions={{
                  font,
                  tickCount: 5,
                  labelOffset: { x: -2, y: 0 },
                  labelColor: Colors.gray,
                  formatYLabel: (v) => `${v}$ `,
                  formatXLabel: (v) => `${dayjs(new Date(v)).format("MM/YY")}`,
                }}
                data={tickersData}
                xKey="timestamp"
                yKeys={["price"]}
              >
                {({ points }) => (
                  <>
                    <Line
                      points={points.price}
                      color={Colors.primary}
                      strokeWidth={3}
                    />
                    {isActive ? (
                      <Tooltip
                        x={state.x.position}
                        y={state.y.price.position}
                      />
                    ) : null}
                  </>
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
          </View>
        )}
        sections={[{ data: [{ title: "Chart" }] }]}
      ></SectionList>
    </>
  );
};

export default CryptoDetailsPage;
