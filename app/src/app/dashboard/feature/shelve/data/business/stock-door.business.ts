import {StockDoorPosition, StockDoorType} from '../enum';
import {Business} from '@core';

export interface StockDoor extends Business {
  wall: StockDoorPosition;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  style: string;
  type: StockDoorType;
}
