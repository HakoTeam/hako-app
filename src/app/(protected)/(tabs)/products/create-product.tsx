import ParallaxScrollView from "@/components/base/ParallaxScrollView";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { Badge } from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

export default function CreateProductScreen() {
  const [variants, setVariants] = useState([
    { name: "Màu sắc", values: ["Đỏ", "Xanh"] },
  ]);
  const [bundleEnabled, setBundleEnabled] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { name: "", values: [""] }]);
  };

  const addVariantValue = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values.push("");
    setVariants(newVariants);
  };

  return (
    <ParallaxScrollView color="bg-muted-background">
      <ThemedText type="defaultSemiBold">Thêm sản phẩm mới</ThemedText>

      <Card title="Hình ảnh sản phẩm">
        <View>
          <IconSymbol
            name="camera"
            size={24}
            className="text-muted-foreground"
          />
          <ThemedText>Thêm ảnh</ThemedText>
        </View>
        <ThemedButton title="Chụp ảnh" />
      </Card>

      <Card title="Thông tin cơ bản">
        <ThemedText>Tên sản phẩm *</ThemedText>
        <ThemedTextInput placeholder="Nhập tên sản phẩm" />

        <ThemedText>Mô tả</ThemedText>
        <ThemedTextInput
          className="h-20"
          placeholder="Mô tả chi tiết"
          multiline
        />

        <ThemedText>SKU</ThemedText>
        <ThemedTextInput placeholder="Mã SKU" />

        <ThemedText>Mã vạch</ThemedText>
        <ThemedTextInput placeholder="Mã vạch" />

        <ThemedText>Danh mục</ThemedText>
        <ThemedTextInput placeholder="Chọn danh mục" />
      </Card>

      <Card title="Giá bán">
        <ThemedText>Giá vốn</ThemedText>
        <ThemedTextInput placeholder="0" keyboardType="numeric" />

        <ThemedText>Giá bán lẻ *</ThemedText>
        <ThemedTextInput placeholder="0" keyboardType="numeric" />
      </Card>

      <Card title="Đơn vị & Quy đổi">
        <ThemedText>Đơn vị cơ bản</ThemedText>
        <ThemedTextInput placeholder="Cái" />

        <ThemedText>Quy đổi</ThemedText>
        <ThemedTextInput placeholder="1 hộp = 12 cái" />
      </Card>

      <Card title="Phân loại sản phẩm">
        <ThemedButton
          onPress={addVariant}
          icon="plus"
          title="Thêm"
          className="flex-row justify-center items-center gap-1"
        ></ThemedButton>

        {variants.map((variant, i) => (
          <View key={i}>
            <ThemedTextInput
              className=""
              placeholder="Tên phân loại"
              value={variant.name}
              onChangeText={(text) => {
                const newVariants = [...variants];
                newVariants[i].name = text;
                setVariants(newVariants);
              }}
            />
            {variant.values.map((val, j) => (
              <ThemedTextInput
                key={j}
                className=""
                placeholder="Giá trị"
                value={val}
                onChangeText={(text) => {
                  const newVariants = [...variants];
                  newVariants[i].values[j] = text;
                  setVariants(newVariants);
                }}
              />
            ))}
            <ThemedButton
              title="Giá trị"
              icon="plus"
              className="flex-row justify-center items-center gap-1"
              onPress={() => addVariantValue(i)}
            ></ThemedButton>
          </View>
        ))}
      </Card>

      <Card title="Nhóm sản phẩm bán kèm">
        <Switch value={bundleEnabled} onValueChange={setBundleEnabled} />
        {bundleEnabled && <ThemedButton title="Thêm sản phẩm bán kèm" />}
      </Card>

      <Card title="Nhãn sản phẩm">
        <View className="flex-row">
          <Badge>Mới</Badge>
          <Badge>Bán chạy</Badge>
          <Badge>Khuyến mãi</Badge>
        </View>
        <ThemedButton title="Thêm nhãn" />
      </Card>

      <View className="flex-row">
        <ThemedButton title="Tạo sản phẩm" className="flex-1" />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
