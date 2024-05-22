import {Payload} from '@core';
import {ShelveDto} from '../dto';

export interface StockCreatePayload extends Payload {
  title: string;
  width: number;
  height: number;
  scale: number;
  shelves: ShelveDto[];
}
