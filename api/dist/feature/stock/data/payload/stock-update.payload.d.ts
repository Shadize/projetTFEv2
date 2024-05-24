import { Shelve, StockDoor } from '@stock/data';
export declare class StockUpdatePayload {
    stock_id: string;
    title: string;
    width: number;
    height: number;
    scale: number;
    shelves: Shelve[];
    doors: StockDoor[];
}
