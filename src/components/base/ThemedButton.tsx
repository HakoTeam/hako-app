import { TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { Loading } from "./LoadingSpinner";
import { ThemedText } from "./ThemedText";

type ThemedButtonProps = TouchableOpacityProps & {
  title?: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "destructive"
    | "warning-outline"
    | "white-outline"
    | "accent-outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string;
};

export function ThemedButton({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  icon,
  disabled,
  ...props
}: ThemedButtonProps) {
  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    outline: "bg-background border border-primary",
    "white-outline": "bg-background border border-white",
    destructive: "bg-destructive",
    warning: "bg-yellow-300",
    "warning-outline": "bg-white border border-yellow-300",
    "accent-outline": "bg-white border border-accent",
    ghost: "bg-transparent",
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
    warning: "text-white",
    "warning-outline": "text-yellow-300",
    "white-outline": "text-white",
    "accent-outline": "text-accent",
    ghost: "text-primary",
  };

  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${isDisabled ? "opacity-50" : ""} ${className}`.trim()}
      disabled={isDisabled}
      {...props}
    >
      {icon ? <IconSymbol name={icon} className={textColors[variant]} /> : null}
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
