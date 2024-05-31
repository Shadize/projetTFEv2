import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Credential } from '@security/model';
import { ConsumptionService } from '@consumption/service';
export declare class ConsumptionController {
    private readonly service;
    constructor(service: ConsumptionService);
    create(payload: ConsumptionCreatePayload, user: Credential): Promise<Consumption>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Consumption>;
    getAll(): Promise<Consumption[]>;
    getByShelveId(shelveId: string): Promise<Consumption[]>;
    getByProduct(productId: string): Promise<Consumption[]>;
    getByAuthor(user: Credential): Promise<Consumption[]>;
}
