import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { strings } from "@/constants/strings";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView className="flex-1 items-center justify-center p-5">
        <ThemedText type="title">{strings.notFoundTitle}</ThemedText>
        <Link href="/(protected)/(tabs)/(home)" className="mt-4 py-4">
          <ThemedText type="link">{strings.goHome}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
