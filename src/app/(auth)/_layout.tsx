import { PhoneAuthenticationProvider } from "@/contexts/PhoneAuthContext";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <PhoneAuthenticationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="phone-input" options={{ headerShown: false }} />
        <Stack.Screen name="otp-verify" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
      </Stack>
    </PhoneAuthenticationProvider>
  );
}
