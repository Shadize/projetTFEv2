import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Repository } from 'typeorm';
import { Credential } from '@security/model';
import { Product } from '@product/data';
export declare class ConsumptionService {
    private readonly repository;
    private readonly logger;
    constructor(repository: Repository<Consumption>);
    list(): Promise<Consumption[]>;
    detail(id: string): Promise<Consumption>;
    delete(id: string): Promise<void>;
    create(payload: ConsumptionCreatePayload, user: Credential): Promise<Consumption>;
    findByShelveId(shelveId: string): Promise<Consumption[]>;
    setForProduct(consumptions: Consumption[], product: Product): Promise<void>;
}
