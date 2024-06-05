import { ProductType } from '@product/data/enum';
import { Consumption } from '@consumption/data';
import { Shelve } from '@stock/data';
export declare class Product {
    product_id: string;
    title: string;
    quantity: number;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    type: ProductType;
    consumptions: Consumption[];
    shelve: Shelve;
}
