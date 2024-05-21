import { Product, ProductCreatePayload, ProductUpdatePayload } from '@product/data';
import { ProductService } from '@product/service/product.service';
export declare class ProductController {
    private readonly service;
    constructor(service: ProductService);
    create(payload: ProductCreatePayload): Promise<Product>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Product>;
    getAll(): Promise<Product[]>;
    update(payload: ProductUpdatePayload): Promise<Product>;
}
