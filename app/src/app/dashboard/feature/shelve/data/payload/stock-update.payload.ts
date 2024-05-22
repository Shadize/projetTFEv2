import {Payload, Section} from '@core';
import {ShelveDto} from '../dto';

export interface StockUpdatePayload extends Payload{
  stock_id:string;
  title: string;
  width: number;
  height: number;
  scale: number;
  shelves: ShelveDto[];
}
