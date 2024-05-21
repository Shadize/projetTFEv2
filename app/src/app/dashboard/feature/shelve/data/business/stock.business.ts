import {Business, Dto, Section} from '@core';
import {Shelve} from './shelve.business';

export interface Stock extends Business {
  title:string;
  section: Section;
  shelves: Shelve[];
}
