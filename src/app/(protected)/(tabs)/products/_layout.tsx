import { strings } from "@/constants/strings";
import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: strings.navProducts,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-product"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
