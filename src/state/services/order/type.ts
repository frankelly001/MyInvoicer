import {CreateOrder, UpdateOrder} from '../../../types/Orders';
import {OrderStatusTypes} from '../../../utils/constants/status';

export type CreateOrderPayloadApiArg = {
  createOrder: Omit<CreateOrder, 'amountDeposited'>;
};

export type UpdateOrderPayloadApiArg = {
  updateOrder: Omit<UpdateOrder, 'amountDeposited'>;
};

export type CommonOrderPayloadApiArg = {
  orderId: string;
};

export type DeleteMultipleOrderPayloadApiArg = {
  arrayOfOrderId: string[];
};

export type GetOrderByStatusPayloadApiArg = {
  page?: number;
  recordStatus: OrderStatusTypes;
};
