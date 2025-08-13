import { strings } from "@/constants/strings";
import { Stack } from "expo-router";

export default function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: strings.navOrders,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-order"
        options={{
          title: "Tạo đơn hàng",
        }}
      />
    </Stack>
  );
}
