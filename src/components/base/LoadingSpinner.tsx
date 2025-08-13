import { strings } from "@/constants/strings";
import { ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  color?: string;
  size?: "large" | "small";
  fullScreen?: boolean;
}

export function Loading({ className, color, size }: LoadingSpinnerProps) {
  return (
    <ActivityIndicator size={size} className={`${className}`} color={color} />
  );
}

export function LoadingSpinner({
  message = strings.loading,
  className,
  color,
  size,
  fullScreen = true,
}: LoadingSpinnerProps) {
  return fullScreen ? (
    <ThemedView className="flex-1 justify-center items-center">
      <ActivityIndicator
        size={size}
        className={`${color ? `text-${color}` : "text-primary"} ${className}`}
        color={color}
      />
      <ThemedText
        className={`${color ? `text-${color}` : "text-primary"} font-montserrat mt-4`}
      >
        {message}
      </ThemedText>
    </ThemedView>
  ) : (
    <ActivityIndicator
      size={size}
      className={`${color ? `text-${color}` : "text-primary"} ${className}`}
      color={color}
    />
  );
}
