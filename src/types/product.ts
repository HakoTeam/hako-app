export interface IProduct {
  product_id: string;
  store_id: string;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  retail_price: number;
  wholesale_price?: number;
  tax: number;
  stock_quantity: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateProductData {
  store_id: string;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  retail_price: number;
  wholesale_price?: number;
  tax?: number;
  stock_quantity: number;
  image_url?: string;
}
