import ParallaxScrollView from "@/components/base/ParallaxScrollView";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedView } from "@/components/base/ThemedView";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView>
      <ThemedView>
        <ThemeSwitcher />
        <ThemedButton
          title="login"
          onPress={() => router.push("/(auth)/login")}
        ></ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  );
}
