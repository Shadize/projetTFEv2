import { Product } from '@product/data';
import { Consumption } from '@consumption/data';
import { Stock } from '@stock/data';
export declare class Shelve {
    shelve_id: string;
    location: Stock;
    rack: string;
    floor: string;
    nb_items_max: number;
    consumptions: Consumption[];
    products: Product[];
    location_reference: string;
    background: string;
    color: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    top: string;
    left: string;
    width: string;
    height: string;
}
