import { formatCurrency } from "@/utils/currency";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../base/ThemedText";
import { ThemedView } from "../base/ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

type StatCardProps = {
  title: string;
  name: string;
  color: string;
  value: string | number;
  note?: string;
  unit?: "đ";
  width?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  name,
  color,
  value,
  note,
  unit,
  title,
  width = "w-full",
}) => {
  return (
    <ThemedView className={`bg-background rounded-xl shadow p-4 ${width}`}>
      <View className="flex-row items-center gap-2 mb-2">
        <IconSymbol name={name} className={`text-${color}`} />
        <ThemedText
          type="defaultSemiBold"
          className="text-sm text-muted-foreground"
        >
          {title}
        </ThemedText>
      </View>

      <ThemedText
        type="defaultSemiBold"
        className={`text-lg font-bold text-${color}`}
      >
        {unit === "đ" ? formatCurrency(value as number) : value}
      </ThemedText>

      {note && (
        <ThemedText type="default" className="text-xs text-gray-500 mt-1">
          {note}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default StatCard;
