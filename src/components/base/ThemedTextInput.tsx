import { useColorScheme } from "nativewind";
import { TextInput, type TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  variant?: "default" | "outline";
};

export function ThemedTextInput({
  variant = "default",
  className = "",
  ...props
}: ThemedTextInputProps) {
  const { colorScheme } = useColorScheme();

  const variantStyles = {
    default: "bg-input border border-border",
    outline: "bg-transparent border border-border",
  };

  return (
    <TextInput
      className={`${variantStyles[variant]} px-4 py-3 rounded-lg text-foreground text-base ${className}`.trim()}
      placeholderTextColor={colorScheme === "dark" ? "#9CA3AF" : "#6B7280"}
      {...props}
    />
  );
}
