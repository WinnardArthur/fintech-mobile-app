import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { MARGIN } from "./config";
import Tile from "./tile";
import SortableList from "./sortable-list";
import { View } from "react-native";

const tiles = [
  {
    id: "spent",
  },
  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const WidgetList = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black", paddingHorizontal: MARGIN }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles, ...tiles].map((tile, index) => (
          <View>
            
          </View>
        ))}
      </SortableList>
    </SafeAreaView>
  );
};

export default WidgetList;
