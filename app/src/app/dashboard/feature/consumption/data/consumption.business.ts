import {Business} from '@core';
import {ProductType} from '@product-feature';
import {ConsumptionStatus} from '@consumption-feature';
import {Credential} from '@security';
import {Stock} from '@shelve-feature';

export interface Consumption extends Business {
  order_date: Date;
  delivery_date: Date;
  quantity: number;
  is_reserved: boolean;
  is_delivered: boolean;
  type: ProductType;
  status: ConsumptionStatus;
  author: Credential;
  stock: Stock;
}
