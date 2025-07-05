import "@/styles/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

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
    </React.Fragment>
  );
};

export default RootLayout;
