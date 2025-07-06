import { toastConfig } from "@/config/toast";
import "@/styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>
      <Toast config={toastConfig} />
    </React.Fragment>
  );
};

export default RootLayout;
