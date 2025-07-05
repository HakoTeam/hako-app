import { HapticTab } from "@/components/base/HapticTab";
import { ThemedText } from "@/components/base/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { SFSymbols6_0 } from "sf-symbols-typescript";

function createTabOptions(
  label: string,
  icon: SFSymbols6_0,
  iconFilled: SFSymbols6_0
) {
  return {
    tabBarLabel: ({ focused }: { focused: boolean }) => (
      <ThemedText
        className={focused ? "text-primary" : "text-muted-foreground"}
      >
        {label}
      </ThemedText>
    ),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
      <IconSymbol
        size={28}
        name={focused ? iconFilled : icon}
        className={focused ? "text-primary" : "text-muted-foreground"}
      />
    ),
  };
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={createTabOptions("Trang chủ", "house", "house.fill")}
      />
      <Tabs.Screen
        name="profile"
        options={createTabOptions("Hồ sơ", "paperplane", "paperplane.fill")}
      />
      <Tabs.Screen
        name="setting"
        options={createTabOptions("Cài đặt", "paperplane", "paperplane.fill")}
      />
    </Tabs>
  );
}
