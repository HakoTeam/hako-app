import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { Loading } from "./LoadingSpinner";
import { ThemedText } from "./ThemedText";

type ThemedButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: "primary" | "secondary" | "outline";
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
    outline: "bg-transparent border border-border",
  };

  const sizeStyles = {
    sm: "px-3 py-2 rounded-md",
    md: "px-4 py-3 rounded-lg",
    lg: "px-6 py-4 rounded-xl",
  };

  const textColors = {
    primary: "primary-foreground",
    secondary: "secondary-foreground",
    outline: "foreground",
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
        color={textColors[variant]}
        className="text-center"
      >
        {loading ? <Loading /> : title}
      </ThemedText>
    </TouchableOpacity>
  );
}
