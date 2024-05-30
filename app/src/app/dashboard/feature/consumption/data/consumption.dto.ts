import {Dto} from '@core';
import {CredentialDto} from '@security';
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
  shelve: string;
  shelve_reference: string;
  productName:string;
}
