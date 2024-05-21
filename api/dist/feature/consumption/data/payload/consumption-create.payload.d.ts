import { ProductType } from '@product/data';
export declare class ConsumptionCreatePayload {
    order_date: Date;
    delivery_date: Date;
    quantity: number;
    is_reserved: boolean;
    is_delivered: boolean;
    type: ProductType;
    shelve: string;
    shelve_reference: string;
}
