import type { PropsWithChildren, ReactElement } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/base/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  className?: string;
  color?: string;
  headerHeight?: number;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  className,
  color,
  headerHeight = 200,
}: Props) {
  const HEADER_HEIGHT = headerHeight;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!headerImage) {
      return {
        height: 0,
        transform: [],
      };
    }
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView className="flex-1" color={color}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          className={`${className} overflow-hidden`}
          style={[
            headerImage && { height: HEADER_HEIGHT },
            headerAnimatedStyle,
          ]}
        >
          {headerImage ? headerImage : null}
        </Animated.View>
        <ThemedView
          className={`flex-1 px-4 gap-4 ${headerImage ? "py-6" : "py-8"}`}
          color={color}
        >
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}
