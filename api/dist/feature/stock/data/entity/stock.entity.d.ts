import { Product } from '@product/data';
import { Section } from '@common/data';
import { Consumption } from '@consumption/data';
export declare class Stock {
    stock_id: string;
    location: string;
    rack: string;
    floor: string;
    nb_items_max: number;
    section: Section;
    consumptions: Consumption[];
    product: Product;
}
