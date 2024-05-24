import {Payload, Section} from '@core';
import {ShelveDto} from '../dto';
import {StockDoorDto} from '../dto/stock-door.dto';

export interface StockUpdatePayload extends Payload{
  stock_id:string;
  title: string;
  width: number;
  height: number;
  scale: number;
  shelves: ShelveDto[];
  doors:StockDoorDto[];
}
