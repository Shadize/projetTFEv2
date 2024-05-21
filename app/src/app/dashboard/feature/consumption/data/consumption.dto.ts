import {Dto} from '@core';
import {CredentialDto} from '@security';
import {StockDto} from '@shelve-feature';
import {ConsumptionStatus} from '@consumption-feature';
import {ProductType} from '@product-feature';

export interface ConsumptionDto extends Dto {
  consumption_id: string;
  order_date: Date;
  delivery_date: Date;
  quantity: number;
  is_reserved: boolean;
  is_delivered: boolean;
  type: ProductType;
  status: ConsumptionStatus;
  author: CredentialDto;
  stock: StockDto;
}
