import {Payload, Section} from '@core';
import {Stock} from '@shelve-feature';
import {Product, ProductDto} from '@product-feature';

export interface ShelveCreatePayload extends Payload {
  rack: string;
  floor: string;
  nbItemsMax: number;
  products: ProductDto[];
  background:string;
  color:string;
  startX:number;
  startY:number;
  endX:number;
  endY:number;
  top:string;
  left:string;
  width:string;
  height:string;
}
