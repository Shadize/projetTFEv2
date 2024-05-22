import {Business, Dto, Section} from '@core';
import {Shelve} from './shelve.business';

export interface Stock extends Business {
  title:string;
  section: Section;
  width:number;
  height:number;
  scale:number;
  shelves: Shelve[];
}
