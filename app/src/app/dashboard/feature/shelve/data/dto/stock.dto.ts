import {Dto, Section} from '@core';
import {ShelveDto} from './shelve.dto';
import {StockDoorDto} from './stock-door.dto';

export interface StockDto extends Dto {
  stock_id: string;
  title: string;
  section: Section;
  width: number;
  height: number;
  scale: number;
  shelves: ShelveDto[];
  doors: StockDoorDto[]
}
