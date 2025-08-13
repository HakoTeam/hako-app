import React from "react";
import { Text, TextProps } from "react-native";
import { ThemedView } from "../base/ThemedView";
import { IconSymbol } from "./IconSymbol";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface IBadgeProps extends TextProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

const badgeStyles = {
  base: "px-2 py-0.5 rounded-full w-fit overflow-hidden",
  variants: {
    default: "bg-primary",
    secondary: "bg-secondary",
    destructive: "bg-destructive",
    outline: "border border-border",
  },
};

export const Badge: React.FC<IBadgeProps> = ({
  variant = "default",
  children,
  className,
  icon,
  ...props
}) => {
  const combinedStyle = [
    badgeStyles.base,
    badgeStyles.variants[variant],
    className,
  ].join(" ");

  const textColors = {
    default: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    outline: "text-foreground",
    destructive: "text-destructive-foreground",
  };

  return (
    <ThemedView className={combinedStyle}>
      {icon ? <IconSymbol name={icon} className={textColors[variant]} /> : null}
      <Text
        className={`text-sm font-medium text-center ${textColors[variant]}`}
        {...props}
      >
        {children}
      </Text>
    </ThemedView>
  );
};
