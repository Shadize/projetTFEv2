import { ProductType } from "../enum";
import { Shelve } from "@stock/data";
export declare class ProductCreatePayload {
    title: string;
    quantity: string;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    shelve: Shelve;
    type: ProductType;
}
