import {Business} from '@core';
import {ProductType} from '@product-feature';
import {Consumption, ConsumptionDto} from '@consumption-feature';

export interface Product extends Business{
  materials: string;
  treatment: string;
  thickness: number;
  title: string;
  width: number;
  height: number;
  price: number;
  type: ProductType;
  consumptions: Consumption[];

}
