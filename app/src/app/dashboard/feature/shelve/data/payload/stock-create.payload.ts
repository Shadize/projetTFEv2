import {Payload, Section} from '@core';
import {Shelve} from '../business';

export interface StockCreatePayload extends Payload{
  title:string;
  width:number;
  height:number;
  scale:number;
  shelves: Shelve[];
}
