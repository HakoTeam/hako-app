export const calculateSubtotal = (orderItems: any) => {
  return orderItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
};
