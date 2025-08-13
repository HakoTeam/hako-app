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

  // Report icons
  "chart.bar.fill": {
    library: "ionicons",
    name: "stats-chart",
  },
  "chart.bar": {
    library: "ionicons",
    name: "stats-chart-outline",
  },

  // Warning icons
  "exclamationmark.triangle": {
    library: "ionicons",
    name: "warning",
  },

  // Carts icons
  cart: {
    library: "ionicons",
    name: "cart-outline",
  },
  "cart.fill": {
    library: "ionicons",
    name: "cart",
  },

  // Products icons
  "cube.fill": {
    library: "ionicons",
    name: "cube",
  },
  cube: {
    library: "ionicons",
    name: "cube-outline",
  },
  // Inventory icons
  "shippingbox.fill": {
    library: "ionicons",
    name: "albums",
  },
  shippingbox: {
    library: "ionicons",
    name: "albums-outline",
  },
  // Inventory icons
  "list.bullet.rectangle.portrait.fill": {
    library: "ionicons",
    name: "receipt",
  },
  "list.bullet.rectangle.portrait": {
    library: "ionicons",
    name: "receipt-outline",
  },

  // Inventory icons
  building: {
    library: "materialcommunity",
    name: "warehouse",
  },
  "tray.and.arrow.up": {
    library: "materialcommunity",
    name: "home-export-outline",
  },
  // Inventory check
  checklist: {
    library: "materialcommunity",
    name: "text-box-check-outline",
  },

  // Transfer inventory
  "arrow.left.arrow.right": {
    library: "materialcommunity",
    name: "transfer",
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
  // Crown icons
  crown: {
    library: "materialcommunity",
    name: "crown-outline",
  },
  // Trending icons
  "chart.line.uptrend.xyaxis": {
    library: "ionicons",
    name: "trending-up",
  },
  "chart.line.downtrend.xyaxis": {
    library: "ionicons",
    name: "trending-down",
  },

  // File chart icons
  "chart.bar.doc.horizontal": {
    library: "materialcommunity",
    name: "file-chart-outline",
  },
  // File text icons
  "doc.text": {
    library: "feather",
    name: "file-text",
  },
  // Menu icons
  "line.3.horizontal": {
    library: "ionicons",
    name: "menu",
  },
  // Flash icons
  "bolt.fill": {
    library: "ionicons",
    name: "flash",
  },
  "bolt.slash": {
    library: "ionicons",
    name: "flash-outline",
  },
  // User icons
  "people.2": {
    library: "ionicons",
    name: "people-outline",
  },
  "people.2.fill": {
    library: "ionicons",
    name: "people",
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

  // camera icons
  camera: {
    library: "feather",
    name: "camera",
  },

  // store icons
  bag: {
    library: "ionicons",
    name: "storefront",
  },
  // filter icons
  "line.3.horizontal.decrease": {
    library: "feather",
    name: "filter",
  },
  // sort icons
  "arrow.up.arrow.down": {
    library: "materialcommunity",
    name: "sort",
  },
  // download icons
  "square.and.arrow.down": {
    library: "feather",
    name: "download",
  },
  // upload icons
  "square.and.arrow.up": {
    library: "feather",
    name: "upload",
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

  // calculator
  calculator: {
    library: "materialcommunity",
    name: "calculator",
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
