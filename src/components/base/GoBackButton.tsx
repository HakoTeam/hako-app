import { strings } from "@/constants/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

interface GoBackButtonProps {
  className?: string;
  color?: string;
}
const GoBackButton = ({ className, color = "primary" }: GoBackButtonProps) => {
  const router = useRouter();
  const handleGoBack = async () => {
    router.back();
  };
  return (
    <TouchableOpacity
      onPress={handleGoBack}
      className={
        className
          ? className
          : "absolute left-4 top-12 bg-transparent flex-row gap-1 items-center"
      }
    >
      <Ionicons
        name="chevron-back-outline"
        size={22}
        className={`text-${color}`}
      />
      <ThemedText className={`text-${color} font-semibold`}>
        {strings.buttonBack}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default GoBackButton;
