import { getStorageItem } from "@/services/storage";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "react-native-reanimated";

export default function ProtectedLayout() {
  const [isReady, setIsReady] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [hasUserPhone, setHasUserPhone] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fontsLoaded] = useFonts({
    "Montserrat-Thin": require("@/assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-ExtraLight": require("@/assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-Light": require("@/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Italic": require("@/assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-Black": require("@/assets/fonts/Montserrat-Black.ttf"),
  });

  useEffect(() => {
    async function checkAuthState() {
      try {
        const onboardingComplete = await getStorageItem("onboarding_seen");
        const userPhone = await getStorageItem("user_phone");
        const authToken = await getStorageItem("auth_token");

        setHasOnboarded(onboardingComplete === "true");
        setIsAuthenticated(!!authToken);
        if (userPhone) setHasUserPhone(userPhone?.length > 0);

        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
      } finally {
        setIsReady(true);
      }
    }

    checkAuthState();
  }, [fontsLoaded]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  if (!hasOnboarded) return <Redirect href="/(auth)/onboarding" />;
  // if (!hasUserPhone) return <Redirect href="/(auth)/phone-input" />;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
