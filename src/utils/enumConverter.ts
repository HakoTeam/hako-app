import { TransactionType } from "@/enum/transaction";

export const getTransactionTypeText = (type: string) => {
  return type === TransactionType.STOCK_IN ? "Nhập kho" : "Xuất kho";
};

export const getReasonText = (reason: string) => {
  const reasonMap: Record<string, string> = {
    SALE: "Bán hàng",
    RETURN: "Trả hàng",
    DAMAGED: "Hàng hỏng",
    TRANSFER: "Chuyển kho",
    ADJUSTMENT: "Điều chỉnh",
  };
  return reasonMap[reason] || reason;
};
