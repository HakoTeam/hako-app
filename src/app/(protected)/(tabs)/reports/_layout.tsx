import { strings } from "@/constants/strings";
import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: strings.navReports,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
