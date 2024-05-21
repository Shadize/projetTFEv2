import {Dto, Section} from '@core';
import {ShelveDto} from './shelve.dto';

export interface StockDto extends Dto {
  stock_id: string;
  title:string;
  section: Section;
  shelves: ShelveDto[];
}
