import { Shelve, StockDoor } from '@stock/data';
export declare class StockCreatePayload {
    title: string;
    width: number;
    height: number;
    scale: number;
    shelves: Shelve[];
    doors: StockDoor[];
}
