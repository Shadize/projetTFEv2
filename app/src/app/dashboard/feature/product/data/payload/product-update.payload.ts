import { Payload } from '@core';
import { ProductType } from '../enum';
import {Consumption, ConsumptionDto} from '@consumption-feature';
import {Shelve, ShelveDto} from '@shelve-feature';

export interface ProductUpdatePayload extends Payload {
  product_id: string;
  materials: string;
  treatment: string;
  thickness: number;
  title: string;
  quantity: number;
  width: number;
  height: number;
  price: number;
  shelve: ShelveDto;
  type: ProductType;
  consumptions?: ConsumptionDto[];
}
