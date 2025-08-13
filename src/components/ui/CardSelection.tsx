import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { ThemedText } from "../base/ThemedText";
import { ThemedView } from "../base/ThemedView";
import { IconSymbol } from "./IconSymbol";

interface CardSelectionProps extends TouchableOpacityProps {
  title?: string;
  color?: string;
  className?: string;
  icon?: string;
  children?: ReactNode;
}

const CardSelection = ({
  title,
  color,
  children,
  className,
  icon,
  ...rest
}: CardSelectionProps) => {
  return (
    <TouchableOpacity {...rest}>
      <ThemedView
        className={`${className} p-4 rounded-xl gap-3`}
        color={color ?? "background"}
      >
        <View className="flex-row items-center justify-between gap-1">
          <View className="gap-3">
            {title && <ThemedText type="defaultSemiBold">{title}</ThemedText>}
            {children}
          </View>
          {icon && <IconSymbol name={icon} />}
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default CardSelection;
