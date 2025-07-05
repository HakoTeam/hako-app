import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { onboardingData } from "@/constants/onboarding";
import { strings } from "@/constants/strings";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, Image } from "react-native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    }
  };

  const handleGetStarted = async () => {
    // await AsyncStorage.setItem("onboarding_seen", "true");
    router.replace("/(auth)/phone-input");
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof onboardingData)[0];
    index: number;
  }) => (
    <ThemedView
      className="flex-1 justify-center items-center px-8"
      style={{ width }}
    >
      <Image
        source={{ uri: item.image }}
        className="w-72 h-72 mb-8"
        resizeMode="contain"
      />
      <ThemedText type="title" className="text-center mb-4">
        {item.title}
      </ThemedText>
      <ThemedText
        color="muted-foreground"
        className="text-center text-lg leading-6"
      >
        {item.description}
      </ThemedText>
    </ThemedView>
  );

  const renderPagination = () => (
    <ThemedView className="flex-row justify-center mb-8">
      {onboardingData.map((_, index) => (
        <ThemedView
          key={index}
          className={`w-2 h-2 rounded-full mx-1 ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
        />
      ))}
    </ThemedView>
  );

  return (
    <ThemedView color="background" className="flex-1 pb-6">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <ThemedView className="px-8 pb-12">
        {renderPagination()}

        {currentIndex === onboardingData.length - 1 ? (
          <ThemedView className="space-y-4 flex-col gap-4 mb-2">
            <ThemedButton
              title={strings.buttonGetStarted}
              onPress={handleGetStarted}
              size="lg"
            />
          </ThemedView>
        ) : (
          <ThemedView className="flex-row justify-between">
            <ThemedButton
              title={strings.buttonSkip}
              variant="outline"
              onPress={handleGetStarted}
            />
            <ThemedButton title={strings.buttonNext} onPress={handleNext} />
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}
