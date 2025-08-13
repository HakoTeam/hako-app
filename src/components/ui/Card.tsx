import React, { ReactNode } from "react";
import { ThemedText } from "../base/ThemedText";
import { ThemedView } from "../base/ThemedView";

interface CardProps {
  title?: string;
  color?: string;
  className?: string;
  children?: ReactNode;
}

const Card = ({ title, color, children, className }: CardProps) => {
  return (
    <ThemedView
      className={`${className} p-4 rounded-xl gap-3`}
      color={color ?? "background"}
    >
      {title && <ThemedText type="defaultSemiBold">{title}</ThemedText>}
      {children}
    </ThemedView>
  );
};

export default Card;
