import React from "react";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  color,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const typeClass = {
    default: "text-base leading-6",
    defaultSemiBold: "text-base leading-6 font-semibold",
    title: "text-4xl font-bold leading-10",
    subtitle: "text-xl font-bold",
    link: "text-base leading-7 text-sky-600",
  }[type];

  const combinedClassName = [
    typeClass,
    color ? `text-${color}` : "text-foreground",
    className,
  ].join(" ");

  return <Text className={combinedClassName} style={style} {...rest} />;
}
