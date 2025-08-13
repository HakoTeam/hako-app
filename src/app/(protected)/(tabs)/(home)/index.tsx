import ParallaxScrollView from "@/components/base/ParallaxScrollView";
import { ThemedButton } from "@/components/base/ThemedButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import InfoCard from "@/components/navigation/InfoCard";
import StatCard from "@/components/reports/StatCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { strings } from "@/constants/strings";
import { router } from "expo-router";
import { Dimensions } from "react-native";
// import { BarChart } from "react-native-gifted-charts";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const subscriptionLeft = 10;
  const revenueValue = 1000000;
  const revenueGrowthRate = -0.4;
  const profitValue = 10000;
  const profitGrowthRate = 0.43;
  const almostOutStockProducts = 2;
  const todayOrders = 20;

  // Mock data for charts
  const revenueData = [
    { value: 50000, label: "T2" },
    { value: 80000, label: "T3" },
    { value: 90000, label: "T4" },
    { value: 70000, label: "T5" },
    { value: 120000, label: "T6" },
    { value: 110000, label: "T7" },
    { value: 100000, label: "CN" },
  ];

  const lowStockProducts = [
    { name: "Áo thun nam", stock: 5 },
    { name: "Quần jean nữ", stock: 3 },
    { name: "Giày thể thao", stock: 2 },
  ];

  return (
    <ParallaxScrollView
      headerHeight={80}
      headerImage={
        <ThemedView className="bg-primary h-full p-8 gap-4">
          <ThemedView className="flex-row justify-between bg-primary">
            <ThemedText type="subtitle" color="primary-foreground">
              {strings.hello}, {strings.shopManager}!
            </ThemedText>
            <IconSymbol
              name="line.3.horizontal"
              className="text-primary-foreground"
            />
          </ThemedView>
          {/* Subscription Status */}
          {/* <ThemedView className="p-3 rounded-lg gap-2 flex-row items-center justify-between bg-accent">
            <ThemedView className="flex-row bg-accent">
              <IconSymbol name="bolt.slash" className="text-white" />
              <ThemedText color="primary-foreground" type="subtitle">
                {strings.dayLeft} {subscriptionLeft} {strings.days}{" "}
                {strings.trials}
              </ThemedText>
            </ThemedView>
            <ThemedButton
              title={strings.upgrade}
              variant="accent-outline"
              size="sm"
              style={{ alignSelf: "flex-start" }}
            />
          </ThemedView> */}
        </ThemedView>
      }
      color="muted-background"
    >
      {/* Stats Cards */}
      <ThemedView className="gap-3" color="muted-background">
        <ThemedView
          className="flex-row flex-wrap gap-2 w-full justify-between"
          color="muted-background"
        >
          <StatCard
            width="w-[49%]"
            color={revenueGrowthRate > 0 ? "green-500" : "red-500"}
            name={
              revenueGrowthRate > 0
                ? "chart.line.uptrend.xyaxis"
                : "chart.line.downtrend.xyaxis"
            }
            title={strings.revenue}
            value={revenueValue}
            note={`${revenueGrowthRate * 100}% ${strings.compareLastDay}`}
            unit="đ"
          />
          <StatCard
            width="w-[49%]"
            color={profitGrowthRate > 0 ? "blue-500" : "red-500"}
            name="chart.bar.fill"
            title={strings.profit}
            value={profitValue}
            note={`${profitGrowthRate * 100}% ${strings.compareLastDay}`}
            unit="đ"
          />
        </ThemedView>
        <ThemedView
          className="flex-row flex-wrap gap-2 w-full justify-between"
          color="muted-background"
        >
          <StatCard
            width="w-[49%]"
            color={almostOutStockProducts < 0 ? "green-500" : "yellow-500"}
            name="exclamationmark.triangle"
            title={strings.almostOutStock}
            value={almostOutStockProducts}
            note={strings.products}
          />
          <StatCard
            width="w-[49%]"
            color={todayOrders > 0 ? "purple-500" : "red-500"}
            name="cart"
            title={strings.todayOrders}
            value={todayOrders}
            note={strings.orders}
          />
        </ThemedView>
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView className="rounded-md gap-3 p-3">
        <ThemedText type="defaultSemiBold" color="primary">
          {strings.quickActions}
        </ThemedText>

        <ThemedView className="flex-row gap-2 flex-wrap">
          <ThemedButton
            title={strings.addProduct}
            variant="primary"
            size="sm"
            icon="plus"
            className="items-center w-[48%]"
            onPress={() =>
              router.push("/(protected)/(tabs)/products/create-product")
            }
          />
          <ThemedButton
            title="Tạo đơn hàng"
            variant="outline"
            size="sm"
            icon="cube"
            className="items-center w-[48%]"
          />
          <ThemedButton
            title="Nhập kho"
            variant="outline"
            size="sm"
            icon="building"
            className="items-center w-[48%]"
          />
          <ThemedButton
            title="Xem báo cáo"
            variant="outline"
            size="sm"
            icon="doc.text"
            className="items-center w-[48%]"
          />
        </ThemedView>
      </ThemedView>

      <ThemedView
        className="flex-row justify-between rounded-lg"
        color="muted-background"
      >
        <ThemedView className="w-[49%]" color="muted-background">
          <InfoCard
            iconName="people.2"
            title="Khách hàng"
            subtitle="Quản lý khách hàng"
            color="blue-500"
          />
        </ThemedView>
        <ThemedView className="w-[49%]" color="muted-background">
          <InfoCard
            iconName="bag"
            title="Tích hợp TMĐT"
            subtitle="Shopee, Tiktok, Facebook"
            color="blue-500"
          />
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
