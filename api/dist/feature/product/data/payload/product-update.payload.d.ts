import { ProductType } from "../enum";
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
    shelve: string;
    type: ProductType;
}
