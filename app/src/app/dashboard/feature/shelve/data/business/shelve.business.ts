import {Business, Section} from '@core';
import {Product} from '@product-feature';

export interface Shelve extends Business{
  location: string;
  rack: string;
  floor: string;
  nbItemsMax: number;
  section: Section;
  product?: Product
}
