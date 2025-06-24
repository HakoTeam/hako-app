import { ActivityIndicator } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <ThemedView className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" className="text-primary" />
      <ThemedText className="text-primary font-poppins mt-4">
        {message}
      </ThemedText>
    </ThemedView>
  );
}
