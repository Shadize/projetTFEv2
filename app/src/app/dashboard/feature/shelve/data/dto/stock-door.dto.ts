import {Dto} from '@core';
import {StockDoorPosition, StockDoorType} from '@shelve-feature';

export interface StockDoorDto extends Dto {
  stock_door_id: string;
  wall: StockDoorPosition;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  style: string;
  type: StockDoorType;
}
