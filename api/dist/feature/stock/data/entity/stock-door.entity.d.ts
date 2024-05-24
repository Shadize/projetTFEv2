import { StockDoorPosition, StockDoorType } from '@stock/data/enum';
import { Stock } from '@stock/data';
export declare class StockDoor {
    stock_door_id: string;
    wall: StockDoorPosition;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    style: string;
    type: StockDoorType;
    location: Stock;
}
