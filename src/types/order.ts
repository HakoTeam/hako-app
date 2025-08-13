export interface IOrder {
  order_id: string;
  store_id: string;
  customer_id?: string;
  order_date: string;
  total_amount: number;
  total_tax_amount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  platform?: "SHOPEE" | "TIKTOK_SHOP" | "FACEBOOK_SHOP" | "OFFLINE";
  created_at: string;
  updated_at: string;
}

export interface IOrderItem {
  order_item_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  tax_amount: number;
  total_price: number;
  total_price_with_tax: number;
}
