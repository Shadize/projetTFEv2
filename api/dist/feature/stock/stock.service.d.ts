import { Repository } from 'typeorm';
import { Stock, StockCreatePayload, StockUpdatePayload } from '@stock/data';
import { Credential } from '@security/model';
export declare class StockService {
    private readonly repository;
    constructor(repository: Repository<Stock>);
    list(user: Credential): Promise<Stock[]>;
    detail(id: string): Promise<Stock>;
    delete(id: string): Promise<void>;
    create(payload: StockCreatePayload): Promise<Stock>;
    update(payload: StockUpdatePayload): Promise<Stock>;
}
