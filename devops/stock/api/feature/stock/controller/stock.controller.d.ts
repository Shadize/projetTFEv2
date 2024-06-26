import { StockService } from '@stock/service/stock.service';
import { Stock, StockCreatePayload, StockUpdatePayload } from '@stock/data';
import { Credential } from '@security/model';
export declare class StockController {
    private readonly service;
    constructor(service: StockService);
    create(user: Credential, payload: StockCreatePayload): Promise<Stock>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Stock>;
    getAll(user: Credential): Promise<Stock[]>;
    update(payload: StockUpdatePayload): Promise<Stock>;
}
