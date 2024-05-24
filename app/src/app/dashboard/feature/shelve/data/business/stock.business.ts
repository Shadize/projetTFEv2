import {Business, Section} from '@core';
import {Shelve} from './shelve.business';
import {StockDoor} from './stock-door.business';

export interface Stock extends Business {
  title: string;
  section: Section;
  width: number;
  height: number;
  scale: number;
  shelves: Shelve[];
  doors: StockDoor[]
}
