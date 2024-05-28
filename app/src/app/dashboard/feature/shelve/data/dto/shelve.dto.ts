import {ProductDto} from '@product-feature';
import {Dto, Section} from '@core';

export interface ShelveDto extends Dto {
  shelve_id: string;
  location: string;
  rack: string;
  floor: string;
  nb_items_max: number;
  section: Section;
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
