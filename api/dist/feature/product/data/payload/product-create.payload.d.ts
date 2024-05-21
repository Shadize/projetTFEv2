import { ProductType } from "../enum";
export declare class ProductCreatePayload {
    title: string;
    materials: string;
    treatment: string;
    thickness: number;
    width: number;
    height: number;
    price: number;
    type: ProductType;
}
