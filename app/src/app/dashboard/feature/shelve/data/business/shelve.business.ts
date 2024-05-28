import {Business, Section} from '@core';
import {Product} from '@product-feature';

export interface Shelve extends Business {
  location: string;
  rack: string;
  floor: string;
  nbItemsMax: number;
  section: Section;
  products: Product[];
  background: string;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  top: string;
  left: string;
  width: string;
  height: string;
  productName: string;
  productQuantity: string;
}
