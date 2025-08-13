import { formatCurrency } from "@/utils/currency";
import React from "react";
import { FlatList } from "react-native";
import { ThemedButton } from "../base/ThemedButton";
import { ThemedText } from "../base/ThemedText";
import { ThemedView } from "../base/ThemedView";
import { Badge } from "../ui/Badge";

interface OrdersListProps {
  orders: any;
}

const OrdersList = ({ orders }: OrdersListProps) => {
  const renderOrder = ({ item: order }) => (
    <ThemedView className="border-t border-muted shadow p-3">
      <ThemedView className="gap-3">
        <ThemedView className="flex-row justify-between items-start">
          <ThemedView>
            <ThemedView className="flex-row items-center gap-2 mb-1">
              <ThemedText className="font-medium">#{order.id}</ThemedText>
              <Badge
                variant={order.platform === "Offline" ? "secondary" : "default"}
              >
                {order.platform}
              </Badge>
            </ThemedView>
            <ThemedText className="text-sm text-muted-foreground">
              {order.customer}
            </ThemedText>
          </ThemedView>

          <ThemedView className="items-end">
            <ThemedText className="font-bold text-green-600">
              {formatCurrency(order.total)}
            </ThemedText>
            <Badge
              variant={
                order.status === "Hoàn thành"
                  ? "default"
                  : order.status === "Đang xử lý"
                    ? "secondary"
                    : "outline"
              }
            >
              {order.status}
            </Badge>
          </ThemedView>
        </ThemedView>

        {/* Hành động */}
        <ThemedView className="flex-row gap-2 justify-end">
          <ThemedButton title="Xuất hóa đơn" size="sm" />

          {order.status === "Chờ xác nhận" && (
            <ThemedButton title="Xác nhận" size="sm" variant="outline" />
          )}
          <ThemedButton
            title="Xem chi tiết"
            variant="outline"
            size="sm"
            className="bg-transparent"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default OrdersList;
