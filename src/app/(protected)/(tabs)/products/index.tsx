import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, TextInput, View } from "react-native";
import { z } from "zod";

const productFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});

type ProductFilterForm = z.infer<typeof productFilterSchema>;

const ProductsScreen = () => {
  const products = [
    {
      id: 1,
      name: "Bánh quy Oreo",
      sku: "ORE001",
      price: "25000",
      stock: 150,
      category: "Bánh kẹo",
    },
    {
      id: 2,
      name: "Kẹo dẻo Haribo",
      sku: "HAR002",
      price: "35000",
      stock: 5,
      category: "Bánh kẹo",
    },
    {
      id: 3,
      name: "Nước ngọt Coca Cola",
      sku: "COC003",
      price: "15000",
      stock: 200,
      category: "Đồ uống",
    },
  ];

  const { control, handleSubmit } = useForm<ProductFilterForm>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const onFilter = (data: ProductFilterForm) => {
    console.log("Filtering with:", data);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <ThemedView className="rounded-xl p-4 mb-3 shadow">
      <ThemedView className="flex-row justify-between items-start mb-2">
        <ThemedView className="flex-1">
          <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
          <ThemedText color="muted" className="text-sm">
            SKU: {item.sku}
          </ThemedText>
          <ThemedText color="primary" className="text-sm">
            {item.category}
          </ThemedText>
        </ThemedView>
        <ThemedView className="items-end">
          <ThemedText type="defaultSemiBold" color="green-600">
            {formatCurrency(item.price as number)}
          </ThemedText>
          <Badge variant={item.stock < 10 ? "destructive" : "secondary"}>
            Tồn: {item.stock}
          </Badge>
        </ThemedView>
      </ThemedView>
      <ThemedView className="flex-row gap-2">
        <ThemedButton
          size="sm"
          title="Sửa"
          variant="outline"
          className="flex-1"
        />
        <ThemedButton
          size="sm"
          title="Nhân bản"
          variant="outline"
          className="flex-1"
        />
        <ThemedButton
          size="sm"
          title="Xóa"
          variant="outline"
          className="flex-1"
        />
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView className="bg-muted-background flex-1 px-4 py-8 gap-3">
      {/* Search bar, filter, sort */}
      <ThemedView className="p-4 rounded-xl bg-background gap-3">
        <ThemedView className="space-y-3 flex-row justify-between">
          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Tìm theo tên, SKU, mô tả..."
                className="bg-muted px-3 py-2 rounded-md w-[75%] text-muted-foreground"
                value={value}
                onChangeText={onChange}
                placeholderTextColor={"#9CA3AF"}
              />
            )}
          />
          <View className="flex-row justify-end">
            <ThemedButton
              variant="ghost"
              size="sm"
              onPress={handleSubmit(onFilter)}
              icon="arrow.up.arrow.down"
              className="items-center justify-center flex-row px-0 py-0 pb-0 pt-0 pr-0 pl-0"
            />
            <ThemedButton
              variant="ghost"
              size="sm"
              onPress={handleSubmit(onFilter)}
              icon="line.3.horizontal.decrease"
              className="items-center justify-center flex-row px-0 py-0 pb-0 pt-0 pr-0 pl-0"
            />
          </View>
        </ThemedView>
      </ThemedView>
      <ThemedView
        className="flex-row gap-2 justify-end"
        color="muted-background"
      >
        <ThemedButton
          title="Nhập"
          variant="outline"
          icon="square.and.arrow.down"
          className="flex-row items-center gap-1 bg-background"
          size="sm"
        />
        <ThemedButton
          title="Xuất"
          variant="outline"
          icon="square.and.arrow.up"
          className="flex-row items-center gap-1 bg-background"
          size="sm"
        />
        <ThemedButton
          size="sm"
          title="Thêm"
          icon="plus"
          className="flex-row justify-center gap-2 items-center"
          onPress={() =>
            router.push("/(protected)/(tabs)/products/create-product")
          }
        />
      </ThemedView>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default ProductsScreen;
