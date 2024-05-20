import { ProductType } from '@product/data/enum';
import { Consumption } from '@consumption/data';
import { Stock } from '@stock/data';
export declare class Product {
    product_id: string;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    type: ProductType;
    consumptions: Consumption[];
    stock: Stock;
}
