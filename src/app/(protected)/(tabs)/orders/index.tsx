import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import OrdersList from "@/components/orders/OrdersList";
import TriggerList from "@/components/ui/Tabs";
import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

const orders = [
  {
    id: "DH001",
    platform: "Offline",
    customer: "Nguyễn Văn A",
    total: "250.000",
    status: "Hoàn thành",
  },
  {
    id: "DH002",
    platform: "Shopee",
    customer: "Lê Thị B",
    total: "175.000",
    status: "Đang xử lý",
  },
  {
    id: "DH003",
    platform: "Lazada",
    customer: "Trần C",
    total: "89.000",
    status: "Chờ xác nhận",
  },
];

export const OrdersScreen = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const simplifiedTriggers = [
    { label: "Tất cả", value: "all" },
    { label: "Chờ xử lý", value: "pending" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "cancelled" },
  ];
  const renderItem = ({ item }: { item: any }) => {
    const isActive = selectedTab === item.value;

    return (
      <TouchableOpacity
        onPress={() => setSelectedTab(item.value)}
        className={`px-2 flex-row justify-center items-center border-b-2 mr-4 ${
          isActive ? "border-primary" : "border-transparent"
        }`}
      >
        <ThemedText
          className={`text-base ${
            isActive ? "text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          {item.label}
        </ThemedText>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView className="bg-muted-background flex-1 px-4 py-8 gap-3">
      {/* Header */}
      <ThemedView className="rounded-xl bg-background py-4">
        <ThemedView className="px-4 gap-3 rounded-xl pb-2">
          <ThemedView className="flex-row justify-between items-center">
            <ThemedText className="text-xl font-bold">
              Quản lý đơn hàng
            </ThemedText>
            <ThemedButton
              size="sm"
              className="flex-row items-center gap-1"
              icon="plus"
              title="Tạo đơn"
              onPress={() =>
                router.push("/(protected)/(tabs)/orders/create-order")
              }
            />
          </ThemedView>
          {/* Tabs */}
          <TriggerList
            simplifiedTriggers={simplifiedTriggers}
            renderItem={renderItem}
          />
        </ThemedView>
        {/* Danh sách đơn hàng */}
        <OrdersList orders={orders} />
      </ThemedView>

      {/* Nút đồng bộ */}
      <ThemedView color="muted-background">
        <ThemedButton
          title="Đồng bộ đơn hàng từ TMĐT"
          icon="bag"
          variant="outline"
          className="w-full gap-2 flex-row items-center justify-center"
        />
      </ThemedView>
    </ThemedView>
  );
};

export default OrdersScreen;
