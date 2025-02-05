export type NewOrderItemDto = {
  quantity: number;
  unitPrice: number;
  productId: number;
};

export type NewOrderDto = {
  orderItems: NewOrderItemDto[];
};
