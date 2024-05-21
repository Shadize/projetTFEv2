import {ProductDto} from '@product-feature';
import {Dto, Section} from '@core';

export interface ShelveDto extends Dto {
  shelve_id: string;
  location: string;
  rack: string;
  floor: string;
  nb_items_max: number;
  section: Section;
  product?: ProductDto
}
