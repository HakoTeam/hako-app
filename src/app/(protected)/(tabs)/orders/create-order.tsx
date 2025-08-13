import ParallaxScrollView from "@/components/base/ParallaxScrollView";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import CustomerSelection from "@/components/customers/CustomerSelection";
import Card from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TriggerList from "@/components/ui/Tabs";
import { calculateSubtotal } from "@/utils/price";
import React, { useState } from "react";
import { View } from "react-native";

export default function CreateOrderScreen() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discount, setDiscount] = useState({ type: "percent", value: 0 });
  const [taxRate, setTaxRate] = useState(10);
  const [selectedTab, setSelectedTab] = useState("customer");

  const customers = [
    {
      id: 1,
      name: "Nguyễn Văn An",
      phone: "0901234567",
      type: "LOYAL",
      discount: 5,
    },
    {
      id: 2,
      name: "Trần Thị Bình",
      phone: "0912345678",
      type: "WHOLESALE",
      discount: 10,
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      phone: "0923456789",
      type: "RETAIL",
      discount: 0,
    },
  ];

  const products = [
    {
      id: 1,
      name: "Bánh quy Oreo",
      sku: "ORE001",
      price: 25000,
      wholesalePrice: 22000,
      stock: 150,
      unit: "Hộp",
    },
    {
      id: 2,
      name: "Kẹo dẻo Haribo",
      sku: "HAR002",
      price: 35000,
      wholesalePrice: 30000,
      stock: 5,
      unit: "Gói",
    },
    {
      id: 3,
      name: "Nước ngọt Coca Cola",
      sku: "COC003",
      price: 15000,
      wholesalePrice: 13000,
      stock: 200,
      unit: "Chai",
    },
    {
      id: 4,
      name: "Bánh mì sandwich",
      sku: "BMS004",
      price: 20000,
      wholesalePrice: 18000,
      stock: 30,
      unit: "Cái",
    },
  ];

  const getProductPrice = (product) => {
    if (selectedCustomer?.type === "WHOLESALE") return product.wholesalePrice;
    return product.price;
  };

  const addProduct = (product) => {
    const existing = orderItems.find((item) => item.id === product.id);
    if (existing) {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOrderItems((prev) => [
        ...prev,
        {
          ...product,
          quantity: 1,
          unitPrice: getProductPrice(product),
        },
      ]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setOrderItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal(orderItems);
    if (discount.type === "percent") return subtotal * (discount.value / 100);
    return discount.value;
  };

  const calculateTax = () => {
    const afterDiscount = calculateSubtotal(orderItems) - calculateDiscount();
    return afterDiscount * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal(orderItems) - calculateDiscount() + calculateTax();
  };

  const simplifiedTriggers = [
    { value: "customer", label: "Khách hàng" },
    { value: "products", label: "Sản phẩm" },
    { value: "items", label: `Giỏ hàng (${orderItems.length})` },
    { value: "summary", label: "Thanh toán" },
  ];

  const renderItem = (value: string) => {
    switch (value) {
      case "customer":
        return (
          <CustomerSelection
            customers={customers}
            onChange={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
          />
        );
      case "products":
        return null;
      case "items":
        return null;
      case "summary":
        return null;
      default:
        return null;
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView className="p-4 space-y-4">
        {selectedCustomer && (
          <Card className="bg-blue-50 border-blue-200 p-3">
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-2 items-center">
                <IconSymbol name="person" className="w-4 h-4 text-blue-600" />
                <View>
                  <ThemedText className="font-medium text-sm">
                    {selectedCustomer.name}
                  </ThemedText>
                  <ThemedText className="text-xs text-gray-600">
                    {selectedCustomer.phone}
                  </ThemedText>
                </View>
              </View>
              <ThemedButton
                title="Đổi"
                variant="ghost"
                className="text-sm"
                onPress={() => setSelectedCustomer(null)}
              />
            </View>
          </Card>
        )}

        <TriggerList
          simplifiedTriggers={simplifiedTriggers}
          renderItem={renderItem}
        />

        <View className="flex-row gap-3 pb-6">
          <ThemedButton
            title="Tạo đơn hàng"
            icon="calculator"
            className="flex-1 justify-center flex-row items-center gap-1"
            disabled={orderItems.length === 0 || !selectedCustomer}
            onPress={() => {}}
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
