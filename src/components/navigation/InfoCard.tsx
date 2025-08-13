import React from "react";
import { Pressable } from "react-native";
import { ThemedText } from "../base/ThemedText";
import { ThemedView } from "../base/ThemedView";
import { IconSymbol } from "../ui/IconSymbol";

type InfoCardProps = {
  iconName: string;
  color?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

const InfoCard: React.FC<InfoCardProps> = ({
  iconName,
  color,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-lg shadow active:opacity-80 w-full"
    >
      <ThemedView className="bg-background rounded-xl p-4 items-center">
        <IconSymbol name={iconName} className={`w-8 h-8 mb-2 text-${color}`} />
        <ThemedText type="defaultSemiBold" color={color}>
          {title}
        </ThemedText>
        {subtitle && (
          <ThemedText
            type="default"
            className="text-xs text-muted-foreground text-center mt-1"
          >
            {subtitle}
          </ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
};

export default InfoCard;
