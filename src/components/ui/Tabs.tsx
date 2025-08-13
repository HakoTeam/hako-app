import React from "react";
import { FlatList, View } from "react-native";

interface TriggerListProps {
  simplifiedTriggers: any[];
  renderItem: any;
}

const TriggerList = ({ simplifiedTriggers, renderItem }: TriggerListProps) => {
  return (
    <View className="w-full bg-transparent">
      <FlatList
        data={simplifiedTriggers}
        renderItem={renderItem}
        keyExtractor={(item) => item.value}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
      />
    </View>
  );
};

export default TriggerList;
