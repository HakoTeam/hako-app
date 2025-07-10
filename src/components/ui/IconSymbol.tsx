import { SymbolWeight } from "expo-symbols";
import { cssInterop } from "nativewind";
import React, { ComponentProps } from "react";

import { type StyleProp, type TextStyle } from "react-native";

// Import multiple icon libraries
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Apply cssInterop to all icon libraries
cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

cssInterop(MaterialIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

cssInterop(AntDesign, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

cssInterop(Feather, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

cssInterop(FontAwesome, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: "color" },
  },
});

// Define icon library types
type IconLibrary =
  | "ionicons"
  | "materialicons"
  | "antdesign"
  | "feather"
  | "fontawesome"
  | "materialcommunity";

// Define icon mapping with library specification
type IconConfig = {
  library: IconLibrary;
  name: string;
};

type IconMapping = Record<string, IconConfig>;

type IconSymbolName = keyof typeof MAPPING;

/**
 * Enhanced SF Symbols to Icon Libraries mapping
 * Each icon specifies which library to use and the icon name
 */
const MAPPING: IconMapping = {
  // House icons
  "house.fill": {
    library: "materialicons",
    name: "house",
  },
  house: {
    library: "ionicons",
    name: "home-outline",
  },

  // Paper plane icons
  "paperplane.fill": {
    library: "ionicons",
    name: "send",
  },
  paperplane: {
    library: "ionicons",
    name: "send-outline",
  },

  // Code icons
  "chevron.left.forwardslash.chevron.right": {
    library: "ionicons",
    name: "code",
  },
  curlybraces: {
    library: "materialcommunity",
    name: "code-braces",
  },

  // Navigation icons
  "chevron.right": {
    library: "ionicons",
    name: "chevron-forward",
  },
  "chevron.left": {
    library: "ionicons",
    name: "chevron-back",
  },
  "chevron.up": {
    library: "ionicons",
    name: "chevron-up",
  },
  "chevron.down": {
    library: "ionicons",
    name: "chevron-down",
  },

  // User icons
  "person.fill": {
    library: "ionicons",
    name: "person",
  },
  person: {
    library: "ionicons",
    name: "person-outline",
  },
  "person.circle": {
    library: "ionicons",
    name: "person-circle",
  },

  // Settings icons
  "gearshape.fill": {
    library: "ionicons",
    name: "settings",
  },
  gearshape: {
    library: "ionicons",
    name: "settings-outline",
  },

  // Search icons
  magnifyingglass: {
    library: "ionicons",
    name: "search-outline",
  },
  "magnifyingglass.circle": {
    library: "ionicons",
    name: "search-circle",
  },

  // Plus icons
  plus: {
    library: "ionicons",
    name: "add-outline",
  },
  "plus.circle": {
    library: "ionicons",
    name: "add-circle-outline",
  },
  "plus.circle.fill": {
    library: "ionicons",
    name: "add-circle",
  },

  // Heart icons
  heart: {
    library: "ionicons",
    name: "heart-outline",
  },
  "heart.fill": {
    library: "ionicons",
    name: "heart",
  },

  // Star icons
  star: {
    library: "ionicons",
    name: "star-outline",
  },
  "star.fill": {
    library: "ionicons",
    name: "star",
  },

  // Menu icons
  "line.horizontal.3": {
    library: "ionicons",
    name: "menu",
  },
  ellipsis: {
    library: "ionicons",
    name: "ellipsis-horizontal",
  },

  // Examples using different libraries
  "shopping.cart": {
    library: "feather",
    name: "shopping-cart",
  },
  envelope: {
    library: "fontawesome",
    name: "envelope",
  },
  bell: {
    library: "materialcommunity",
    name: "bell",
  },
  calendar: {
    library: "antdesign",
    name: "calendar",
  },

  // Number icons (for tab bar or list items)
  number: {
    library: "materialcommunity",
    name: "numeric",
  },
  "1.circle": {
    library: "materialcommunity",
    name: "numeric-1-circle",
  },
  "2.circle": {
    library: "materialcommunity",
    name: "numeric-2-circle",
  },
  "3.circle": {
    library: "materialcommunity",
    name: "numeric-3-circle",
  },
  "4.circle": {
    library: "materialcommunity",
    name: "numeric-4-circle",
  },
  "5.circle": {
    library: "materialcommunity",
    name: "numeric-5-circle",
  },
};

/**
 * An enhanced icon component that uses native SF Symbols on iOS, and selects the best
 * icon library on Android and web based on the specific icon needed.
 * This ensures optimal icon availability and consistent look across platforms.
 */
export function IconSymbol({
  name,
  size = 24,
  style,
  className,
  weight,
}: {
  name: string; // Change to string to accept any icon name
  size?: number;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  className?: string;
}) {
  const iconConfig = MAPPING[name];

  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in mapping`);
    return null;
  }

  const { library, name: iconName } = iconConfig;

  // Render the appropriate icon component based on library
  switch (library) {
    case "ionicons":
      return (
        <Ionicons
          className={className}
          size={size}
          name={iconName as ComponentProps<typeof Ionicons>["name"]}
          style={style}
        />
      );

    case "materialicons":
      return (
        <MaterialIcons
          className={className}
          size={size}
          name={iconName as ComponentProps<typeof MaterialIcons>["name"]}
          style={style}
        />
      );

    case "antdesign":
      return (
        <AntDesign
          className={className}
          size={size}
          name={iconName as ComponentProps<typeof AntDesign>["name"]}
          style={style}
        />
      );

    case "feather":
      return (
        <Feather
          className={className}
          size={size}
          name={iconName as ComponentProps<typeof Feather>["name"]}
          style={style}
        />
      );

    case "fontawesome":
      return (
        <FontAwesome
          className={className}
          size={size}
          name={iconName as ComponentProps<typeof FontAwesome>["name"]}
          style={style}
        />
      );

    case "materialcommunity":
      return (
        <MaterialCommunityIcons
          className={className}
          size={size}
          name={
            iconName as ComponentProps<typeof MaterialCommunityIcons>["name"]
          }
          style={style}
        />
      );

    default:
      console.warn(`Unknown icon library: ${library}`);
      return null;
  }
}
