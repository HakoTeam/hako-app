import { TransactionReason, TransactionType } from "@/enum/transaction";

export interface IInventoryTransaction {
  transaction_id: string;
  product_id: string;
  store_id: string;
  transaction_type: TransactionType;
  reason: TransactionReason;
  quantity: number;
  order_id?: string;
  related_store_id?: string;
  related_transaction_id?: string;
  transaction_date: string;
  notes?: string;
}
