import { Shelve, ShelveCreatePayload, ShelveUpdatePayload } from '@stock/data';
import { Repository } from 'typeorm';
export declare class ShelveService {
    private readonly repository;
    constructor(repository: Repository<Shelve>);
    list(): Promise<Shelve[]>;
    detail(id: string): Promise<Shelve>;
    delete(id: string): Promise<void>;
    create(payload: ShelveCreatePayload): Promise<Shelve>;
    update(payload: ShelveUpdatePayload): Promise<Shelve>;
}
