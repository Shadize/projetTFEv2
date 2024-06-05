import { Product } from '@product/data';
import { Credential } from '@security/model';
import { ConsumptionStatus } from '@consumption/data';
export declare class Consumption {
    consumption_id: string;
    order_date: Date;
    delivery_date: Date;
    quantity: number;
    is_reserved: boolean;
    is_delivered: boolean;
    status: ConsumptionStatus;
    product: Product;
    author: Credential;
    productName: string;
    shelve: string;
    shelve_reference: string;
}
