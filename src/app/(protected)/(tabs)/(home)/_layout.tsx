import { strings } from "@/constants/strings";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: strings.navHome,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
