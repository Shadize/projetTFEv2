import {Payload} from '@core';
import {Stock} from '@shelve-feature';
import {ProductType} from '@product-feature';

export interface ConsumptionCreatePayload extends Payload {
  consumption_id: string;
  order_date: Date;
  delivery_date: Date;
  quantity: number;
  is_reserved: boolean;
  is_delivered: boolean;
  type: ProductType;
  stock: Stock;
}
