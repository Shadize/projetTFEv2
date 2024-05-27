import { Payload } from '@core';
import { ProductType } from '../enum';
import { Consumption } from '@consumption-feature';
import { Shelve } from '@shelve-feature';

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
  shelve?: Shelve;
  type: ProductType;
  consumptions?: Consumption[];
}