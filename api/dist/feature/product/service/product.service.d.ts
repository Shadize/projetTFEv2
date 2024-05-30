import { Product } from '@product/data';
import { ProductCreatePayload, ProductUpdatePayload } from '@product/data/payload';
import { Repository } from 'typeorm';
import { ConsumptionService } from '@consumption/service';
export declare class ProductService {
    private readonly consumptionService;
    private readonly repository;
    private readonly logger;
    constructor(consumptionService: ConsumptionService, repository: Repository<Product>);
    list(): Promise<Product[]>;
    detail(id: string): Promise<Product>;
    delete(id: string): Promise<void>;
    create(payload: ProductCreatePayload): Promise<Product>;
    update(payload: ProductUpdatePayload): Promise<Product>;
}
