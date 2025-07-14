import { strings } from "@/constants/strings";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export interface ToastProps {
  type: "success" | "error" | "info" | "warn";
  text1?: string;
  text2?: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: string;
  iconColor?: string;
}

const ThemedToast: React.FC<ToastProps> = ({
  type = "success",
  text1,
  text2,
  backgroundColor,
  textColor,
  icon,
  iconColor,
}) => {
  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          bgClass: backgroundColor ? "" : "bg-green-50",
          iconName: icon || "checkmark-circle",
          iconColor: iconColor || "text-green-500",
          textColorClass: textColor ? "" : "text-green-500",
          shadow: "shadow-green-500/20",
          border: "border-green-500",
          title: text1 ? text1 : strings.toastSuccessTitle,
          description: text2 ? text2 : strings.toastSuccessDescription,
        };
      case "error":
        return {
          bgClass: backgroundColor ? "" : "bg-red-50",
          iconName: icon || "close-circle",
          iconColor: iconColor || "text-red-500",
          textColorClass: textColor ? "" : "text-red-500",
          shadow: "shadow-red-500/20",
          border: "border-red-500",
          title: text1 ? text1 : strings.toastErrorTitle,
          description: text2 ? text2 : strings.toastErrorDescription,
        };
      case "info":
        return {
          bgClass: backgroundColor ? "" : "bg-blue-50",
          iconName: icon || "information-circle",
          iconColor: iconColor || "text-blue-500",
          textColorClass: textColor ? "" : "text-blue-500",
          shadow: "shadow-blue-500/20",
          border: "border-blue-500",
          title: text1 ? text1 : strings.toastInfoTitle,
          description: text2 ? text2 : strings.toastInfoDescription,
        };
      case "warn":
        return {
          bgClass: backgroundColor
            ? ""
            : "bg-yellow-50 border border-yellow-200",
          iconName: icon || "warning",
          iconColor: iconColor || "text-yellow-500",
          textColorClass: textColor ? "" : "text-yellow-500",
          shadow: "shadow-yellow-500/20",
          border: "border-yellow-500",
          title: text1 ? text1 : strings.toastWarnTitle,
          description: text2 ? text2 : strings.toastWarnDescription,
        };
      default:
        return {
          bgClass: backgroundColor ? "" : "bg-green-50",
          iconName: icon || "checkmark-circle",
          iconColor: iconColor || "text-green-500",
          textColorClass: textColor ? "" : "text-green-500",
          shadow: "shadow-green-500/20",
          border: "border-green-500",
          title: text1 ? text1 : strings.toastSuccessTitle,
          description: text2 ? text2 : strings.toastSuccessDescription,
        };
    }
  };

  const config = getToastConfig();

  return (
    <ThemedView
      className={`flex-row items-center mx-5 p-3 rounded-md shadow-lg border elevation-8 ${config.border} ${config.bgClass} ${config.shadow}`}
    >
      <View className="mr-2">
        <Ionicons
          name={config.iconName as any}
          size={24}
          className={`${config.iconColor}`}
        />
      </View>
      <View className="flex-1">
        {config.title && (
          <ThemedText
            type="defaultSemiBold"
            color="white"
            className={`${config.textColorClass}`}
          >
            {config.title}
          </ThemedText>
        )}
        {config.description && (
          <ThemedText
            color="white"
            className={`opacity-90 ${config.textColorClass}`}
          >
            {config.description}
          </ThemedText>
        )}
      </View>
      <TouchableOpacity
        onPress={() => Toast.hide()}
        className="ml-1 p-1"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="x" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ThemedToast;
