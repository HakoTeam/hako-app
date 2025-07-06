import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { Loading } from "./LoadingSpinner";
import { ThemedText } from "./ThemedText";

type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export function ThemedButton({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  disabled,
  ...props
}: ThemedButtonProps) {
  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "bg-transparent border border-primary",
    destructive: "bg-destructive",
  };

  const sizeStyles = {
    sm: "px-3 py-2 rounded-md",
    md: "px-4 py-3 rounded-lg",
    lg: "px-6 py-4 rounded-xl",
  };

  const textColors = {
    primary: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    outline: "text-primary",
    destructive: "text-destructive-foreground",
  };

  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? "opacity-50" : ""} ${className}`.trim()}
      disabled={isDisabled}
      {...props}
    >
      <ThemedText
        type="defaultSemiBold"
        className={`text-center ${textColors[variant]}`}
      >
        {loading ? (
          <Loading color={variant === "outline" ? "#9CA3AF" : "#FFFFFF"} />
        ) : (
          title
        )}
      </ThemedText>
    </TouchableOpacity>
  );
}
