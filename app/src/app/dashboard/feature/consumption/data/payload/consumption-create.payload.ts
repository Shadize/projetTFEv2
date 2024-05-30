import {Payload} from '@core';
import {Stock} from '@shelve-feature';
import {Product, ProductType} from '@product-feature';
import { ConsumptionStatus } from '../enum';

export interface ConsumptionCreatePayload extends Payload {
  order_date: Date;
  delivery_date: Date;
  quantity: number;
  is_reserved: boolean;
  is_delivered: boolean;
  type: ProductType;
  status: ConsumptionStatus;
  author?: Credential;
  shelve: string;
  shelve_reference: string;

  product: Product;
  productName:string;
}
