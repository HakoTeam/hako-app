import { strings } from "@/constants/strings";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity } from "react-native";
import { ThemedTextInput, ThemedTextInputProps } from "./ThemedTextInput";
import { ThemedView } from "./ThemedView";

interface ThemedPasswordInputProps extends ThemedTextInputProps {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  variant?: "default" | "outline";
  className?: string;
}

const ThemedPasswordInput = ({
  variant = "default",
  password,
  setPassword,
  showPassword,
  setShowPassword,
  className,
  ...props
}: ThemedPasswordInputProps) => {
  const variantStyles = {
    default: "bg-input border border-border",
    outline: "bg-transparent border border-border",
  };
  return (
    <ThemedView
      className={`${variantStyles[variant]} flex-row gap-1 w-full items-center rounded-md`}
    >
      <ThemedTextInput
        placeholder={strings.passwordPlaceholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        variant={variant}
        className={`w-4/5 ${className}`}
        {...props}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        className="flex items-center w-1/5"
      >
        {showPassword ? (
          <Ionicons
            name="eye-off-outline"
            size={24}
            className="text-muted-foreground"
          />
        ) : (
          <Ionicons
            name="eye-outline"
            size={24}
            className="text-muted-foreground"
          />
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

export default ThemedPasswordInput;
