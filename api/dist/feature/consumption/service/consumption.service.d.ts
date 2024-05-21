import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Repository } from 'typeorm';
export declare class ConsumptionService {
    private readonly repository;
    constructor(repository: Repository<Consumption>);
    list(): Promise<Consumption[]>;
    detail(id: string): Promise<Consumption>;
    delete(id: string): Promise<void>;
    create(payload: ConsumptionCreatePayload): Promise<Consumption>;
}
