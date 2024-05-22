import { Section } from '@common/data';
import { Shelve } from '@stock/data';
export declare class Stock {
    stock_id: string;
    title: string;
    width: number;
    height: number;
    scale: number;
    section: Section;
    shelves: Shelve[];
}
