import { PropsWithChildren, useState } from "react";
import { TouchableOpacity } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView>
      <TouchableOpacity
        className="flex-row items-center gap-2"
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          className="text-icon"
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView className="mt-2 ml-6">{children}</ThemedView>}
    </ThemedView>
  );
}
