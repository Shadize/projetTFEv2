import { Product } from '@product/data';
export declare class StockUpdatePayload {
    stock_id: string;
    location: string;
    rack: string;
    floor: string;
    nb_items_max: number;
    product: Product;
}
