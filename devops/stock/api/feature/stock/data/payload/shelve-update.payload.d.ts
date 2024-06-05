import { Product } from '@product/data';
import { Stock } from '@stock/data';
export declare class ShelveUpdatePayload {
    shelve_id: string;
    location: Stock;
    rack: string;
    floor: string;
    nb_items_max: number;
    products: Product[];
}
