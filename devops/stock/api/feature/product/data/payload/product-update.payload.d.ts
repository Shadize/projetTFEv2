import { ProductType } from '../enum';
import { Shelve } from '@stock/data';
import { Consumption } from '@consumption/data';
export declare class ProductUpdatePayload {
    product_id: string;
    title: string;
    quantity: number;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    shelve: Shelve;
    type: ProductType;
    consumptions: Consumption[];
}
