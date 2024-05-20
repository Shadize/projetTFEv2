import { ProductType } from '@product/data';
import { Stock } from '@stock/data';
export declare class ConsumptionCreatePayload {
    consumption_id: string;
    order_date: Date;
    delivery_date: Date;
    quantity: number;
    is_reserved: boolean;
    is_delivered: boolean;
    type: ProductType;
    stock: Stock;
}
