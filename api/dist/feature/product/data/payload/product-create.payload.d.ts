import { ProductType } from "../enum";
export declare class ProductCreatePayload {
    title: string;
    quantity: string;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    shelve: string;
    type: ProductType;
}
