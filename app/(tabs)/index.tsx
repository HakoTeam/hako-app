import ParallaxScrollView from "@/components/base/ParallaxScrollView";
import { ThemedView } from "@/components/base/ThemedView";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function HomeScreen() {
  return (
    <ParallaxScrollView>
      <ThemedView>
        <ThemeSwitcher />
      </ThemedView>
    </ParallaxScrollView>
  );
}
