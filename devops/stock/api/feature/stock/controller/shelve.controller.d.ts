import { ShelveService } from '@stock/service';
import { Shelve, ShelveCreatePayload, ShelveUpdatePayload } from '@stock/data';
export declare class ShelveController {
    private readonly service;
    constructor(service: ShelveService);
    create(payload: ShelveCreatePayload): Promise<Shelve>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Shelve>;
    getAll(): Promise<Shelve[]>;
    update(payload: ShelveUpdatePayload): Promise<Shelve>;
}
