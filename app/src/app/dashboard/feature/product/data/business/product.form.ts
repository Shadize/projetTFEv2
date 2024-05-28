import {ProductType} from '@product-feature';

export interface ProductForm{
  id:string;
  materials: string;
  treatment: string;
  thickness: number;
  title: string;
  quantity: number;
  width: number;
  height: number;
  price: number;
  shelve: string;
  type: ProductType;
}
