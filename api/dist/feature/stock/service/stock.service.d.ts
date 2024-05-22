import { Repository } from 'typeorm';
import { Stock, StockCreatePayload, StockUpdatePayload } from '@stock/data';
import { Credential } from '@security/model';
import { ShelveService } from '@stock/service/shelve.service';
export declare class StockService {
    private readonly repository;
    private readonly shelveService;
    private readonly logger;
    constructor(repository: Repository<Stock>, shelveService: ShelveService);
    list(user: Credential): Promise<Stock[]>;
    detail(id: string): Promise<Stock>;
    delete(id: string): Promise<void>;
    create(user: Credential, payload: StockCreatePayload): Promise<Stock>;
    update(payload: StockUpdatePayload): Promise<Stock>;
}
