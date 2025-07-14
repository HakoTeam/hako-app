import { toastConfig } from "@/config/toast";
import { queryClient } from "@/services/queryClient";
import "@/styles/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
};

export default RootLayout;
