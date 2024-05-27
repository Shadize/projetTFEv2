import {Dto} from '@core';
import {ProductType} from '@product-feature';
import {ConsumptionDto} from '@consumption-feature';
import { Shelve } from '@shelve-feature';

export interface ProductDto extends Dto{
  product_id: string;
  materials: string;
  treatment: string;
  title: string;
  quantity: number;
  thickness: number;
  width: number;
  height: number;
  price: number;
  shelve?: Shelve;
  type: ProductType;
  consumptions: ConsumptionDto[];

}
