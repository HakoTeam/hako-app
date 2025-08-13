export interface ISubscription {
  subscription_id: string;
  user_id: string;
  plan_id: string;
  start_date: string;
  end_date?: string;
  trial_end_date?: string;
  usage_metrics?: Record<string, number>;
  max_stores: number;
  max_products: number;
  max_invoices: number;
  created_at: string;
  updated_at: string;
}

export interface IFeatureUsage {
  usage_id: string;
  subscription_id: string;
  user_id: string;
  feature_id: string;
  usage_count: number;
  usage_date: string;
  cost: number;
  notes?: string;
}
