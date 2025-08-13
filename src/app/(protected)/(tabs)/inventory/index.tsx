import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { Badge } from "@/components/ui/Badge";
import { TransactionReason, TransactionType } from "@/enum/transaction";
import { IInventoryTransaction } from "@/types/inventory";
import { getReasonText, getTransactionTypeText } from "@/utils/enumConverter";
import { formatDateTime } from "@/utils/time";
import React, { useState } from "react";
import { FlatList } from "react-native";

const InventoryScreen = () => {
  const [transactions, setTransactions] = useState<IInventoryTransaction[]>([
    {
      transaction_id: "1",
      product_id: "1",
      store_id: "1",
      transaction_type: TransactionType.STOCK_IN,
      reason: TransactionReason.ADJUSTMENT,
      quantity: 100,
      transaction_date: "2024-01-15T10:00:00Z",
      notes: "Nhập hàng đầu kỳ",
    },
    {
      transaction_id: "2",
      product_id: "1",
      store_id: "1",
      transaction_type: TransactionType.STOCK_OUT,
      reason: TransactionReason.SALE,
      quantity: 5,
      order_id: "1",
      transaction_date: "2024-01-15T14:30:00Z",
      notes: "Bán hàng",
    },
    {
      transaction_id: "3",
      product_id: "2",
      store_id: "1",
      transaction_type: TransactionType.STOCK_IN,
      reason: TransactionReason.RETURN,
      quantity: 2,
      transaction_date: "2024-01-15T16:00:00Z",
      notes: "Khách hàng trả hàng",
    },
  ]);

  return (
    <ThemedView className="bg-muted-background flex-1 px-4 py-8 gap-3">
      {/* Header */}
      <ThemedView className="border-b border-border p-4 rounded-xl bg-background">
        <ThemedView className="flex-row justify-between items-center mb-4">
          <ThemedText type="title" className="text-xl">
            Quản lý kho hàng
          </ThemedText>
          <ThemedButton
            size="sm"
            title="Giao dịch"
            className="flex-row items-center gap-1"
            icon="plus"
          />
        </ThemedView>

        {/* Quick Stats */}
        <ThemedView className="flex-row justify-between">
          <ThemedView className="items-center flex-1">
            <ThemedText className="text-3xl font-bold text-green-600">
              156
            </ThemedText>
            <ThemedText className="text-sm text-muted-foreground">
              Nhập hôm nay
            </ThemedText>
          </ThemedView>
          <ThemedView className="items-center flex-1">
            <ThemedText className="text-3xl font-bold text-red-600">
              89
            </ThemedText>
            <ThemedText className="text-sm text-muted-foreground">
              Xuất hôm nay
            </ThemedText>
          </ThemedView>
          <ThemedView className="items-center flex-1">
            <ThemedText className="text-3xl font-bold text-yellow-500">
              8
            </ThemedText>
            <ThemedText className="text-sm text-muted-foreground">
              Sắp hết hàng
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Action Buttons */}

      <ThemedView className="flex-row flex-wrap justify-between gap-3 rounded-xl p-4">
        <ThemedButton
          className="justify-center items-center w-[48%]"
          title="Nhập kho"
          icon="building"
        />
        <ThemedButton
          variant="outline"
          className="justify-center items-center w-[48%]"
          title="Xuất kho"
          icon="tray.and.arrow.up"
        />
        <ThemedButton
          variant="outline"
          className="justify-center items-center w-[48%]"
          title="Chuyển kho"
          icon="arrow.left.arrow.right"
        />
        <ThemedButton
          variant="outline"
          className="justify-center items-center w-[48%]"
          title="Kiểm kho"
          icon="checklist"
        />
      </ThemedView>

      {/* Recent Transactions */}
      <ThemedView className="bg-card rounded-xl p-4 shadow-sm">
        <ThemedText className="text-base font-medium mb-3">
          Giao dịch gần đây
        </ThemedText>

        <FlatList
          data={transactions}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <ThemedView className="flex-row justify-between items-center py-2 border-b border-border last:border-b-0">
              <ThemedView>
                <ThemedText className="font-medium text-sm">
                  {item.product_id}
                </ThemedText>
                <ThemedText className="text-sm text-muted-foreground">
                  {getTransactionTypeText(item.transaction_type)} -{" "}
                  {formatDateTime(item.transaction_date)}
                </ThemedText>
                <ThemedText className="text-sm text-muted-foreground">
                  {getReasonText(item.reason)}
                </ThemedText>
              </ThemedView>
              <Badge
                variant={
                  item.transaction_type === TransactionType.STOCK_IN
                    ? "default"
                    : "secondary"
                }
              >
                {item.quantity}
              </Badge>
            </ThemedView>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default InventoryScreen;
