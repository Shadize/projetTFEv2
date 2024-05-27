import {Business} from '@core';
import {ProductType} from '@product-feature';
import {Consumption, ConsumptionDto} from '@consumption-feature';
import { Shelve } from '@shelve-feature';

export interface Product extends Business{
  materials: string;
  treatment: string;
  thickness: number;
  title: string;
  quantity: number;
  width: number;
  height: number;
  price: number;
  shelve?: string;
  type: ProductType;
  consumptions: Consumption[];

}
