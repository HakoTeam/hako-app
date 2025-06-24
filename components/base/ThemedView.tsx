import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  color?: string;
};

export function ThemedView({
  style,
  color,
  className,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      className={`${className} ${color ? `bg-${color}` : "bg-background"}`}
      style={style}
      {...otherProps}
    />
  );
}
