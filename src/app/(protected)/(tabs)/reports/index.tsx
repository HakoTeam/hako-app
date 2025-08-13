import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import TriggerList from "@/components/ui/Tabs";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const ReportsScreen = () => {
  const [selectedTab, setSelectedTab] = useState("revenue");

  const tabOptions = [
    { label: "Bán hàng", value: "revenue" },
    { label: "Lãi lỗ", value: "profit" },
    { label: "Kho hàng", value: "inventory" },
    { label: "Thu chi", value: "expenses" },
  ];

  const renderTabTrigger = ({ item }: { item: any }) => {
    const isActive = selectedTab === item.value;
    return (
      <TouchableOpacity
        onPress={() => setSelectedTab(item.value)}
        className={`px-2 justify-center items-center border-b-2 mr-4 ${
          isActive ? "border-primary" : "border-transparent"
        }`}
      >
        <Text
          className={`text-base ${isActive ? "text-primary font-semibold" : "text-gray-500"}`}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView className="bg-muted-background flex-1 px-4 py-8 gap-3">
      {/* Header */}
      <ThemedView className="border-b border-border p-4 rounded-xl bg-background">
        <ThemedText className="text-xl font-bold mb-4">
          Báo cáo & Thống kê
        </ThemedText>

        {/* Date Filter */}
        <ThemedView className="flex-row gap-2">
          <ThemedButton variant="outline" size="sm" title="Xuất Excel" />
        </ThemedView>
      </ThemedView>

      <ScrollView className="p-4 space-y-4">
        {/* Trigger Tabs */}
        <TriggerList
          simplifiedTriggers={tabOptions}
          renderItem={renderTabTrigger}
        />

        {/* Tab Content */}
        {selectedTab === "revenue" && (
          <View className="space-y-4">
            {/* Doanh thu hôm nay */}

            {/* Sản phẩm bán chạy */}
          </View>
        )}

        {selectedTab === "inventory" && <View className="space-y-4"></View>}
      </ScrollView>
    </ThemedView>
  );
};

export default ReportsScreen;
