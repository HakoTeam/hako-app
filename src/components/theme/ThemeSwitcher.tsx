import { useColorScheme } from "nativewind";

import { Switch } from "react-native";
import { ThemedText } from "../base/ThemedText";

export default function ThemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <>
      <Switch
        className="text-primary"
        value={colorScheme === "dark"}
        onValueChange={toggleColorScheme}
      />
      <ThemedText className="text-foreground">Dark mode</ThemedText>
    </>
  );
}
