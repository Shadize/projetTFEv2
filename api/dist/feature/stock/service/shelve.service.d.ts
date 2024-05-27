import { Shelve, ShelveCreatePayload, ShelveUpdatePayload, Stock } from '@stock/data';
import { Repository } from 'typeorm';
import { Product } from '@product/data';
export declare class ShelveService {
    private readonly repository;
    constructor(repository: Repository<Shelve>);
    list(): Promise<Shelve[]>;
    detail(id: string): Promise<Shelve>;
    delete(id: string): Promise<void>;
    create(payload: ShelveCreatePayload): Promise<Shelve>;
    update(payload: ShelveUpdatePayload): Promise<Shelve>;
    setStockShelve(detail: Stock, shelves: Shelve[]): Promise<void>;
    deleteForStock(stock: Stock): Promise<void>;
    linkProduct(detail: Product, shelveId: string): Promise<void>;
}
