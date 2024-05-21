import {Dto} from '@core';
import {ProductType} from '@product-feature';
import {ConsumptionDto} from '@consumption-feature';

export interface ProductDto extends Dto{
  product_id: string;
  materials: string;
  treatment: string;
  title: string;
  thickness: number;
  width: number;
  height: number;
  price: number;
  type: ProductType;
  consumptions: ConsumptionDto[];

}
