import { ThemedButton } from "../base/ThemedButton";
import { ThemedText } from "../base/ThemedText";
import { ThemedTextInput } from "../base/ThemedTextInput";
import { ThemedView } from "../base/ThemedView";
import { Badge } from "../ui/Badge";
import CardSelection from "../ui/CardSelection";
import { IconSymbol } from "../ui/IconSymbol";

interface CustomerSelectionProps {
  customers: any[];
  selectedCustomer: any;
  onChange: (customer: any) => void;
}

const CustomerSelection = ({
  customers,
  selectedCustomer,
  onChange,
}: CustomerSelectionProps) => (
  <ThemedView className="space-y-3">
    <ThemedView className="relative">
      <IconSymbol
        name="magnifyingglass"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      />
      <ThemedTextInput
        placeholder="Tìm khách hàng theo tên, SĐT..."
        className="pl-10"
      />
    </ThemedView>
    {customers.map((customer) => (
      <CardSelection
        key={customer.id}
        className={`p-3 ${selectedCustomer?.id === customer.id ? "ring-2 ring-blue-500 bg-blue-50" : ""}`}
        onPress={() => onChange(customer)}
      >
        <ThemedView className="flex-row justify-between items-center">
          <ThemedView>
            <ThemedText className="font-medium text-sm">
              {customer.name}
            </ThemedText>
            <ThemedText className="text-xs text-gray-600">
              {customer.phone}
            </ThemedText>
          </ThemedView>
          <ThemedView className="items-end">
            <Badge
              variant={customer.type === "LOYAL" ? "default" : "secondary"}
            >
              {customer.type === "LOYAL"
                ? "Thân thiết"
                : customer.type === "WHOLESALE"
                  ? "Bán sỉ"
                  : "Bán lẻ"}
            </Badge>
            {customer.discount > 0 && (
              <ThemedText className="text-xs text-green-600">{`Giảm ${customer.discount}%`}</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
      </CardSelection>
    ))}
    <ThemedButton
      title="Thêm khách hàng mới"
      icon={"plus"}
      variant="outline"
      className="w-full"
      onPress={() => {}}
    />
  </ThemedView>
);

export default CustomerSelection;
