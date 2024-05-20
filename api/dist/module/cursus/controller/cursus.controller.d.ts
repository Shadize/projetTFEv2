import { Cursus, CursusCreatePayload, CursusUpdatePayload } from "../model";
import { CursusService } from "../service";
export declare class CursusController {
    private readonly service;
    constructor(service: CursusService);
    create(payload: CursusCreatePayload): Promise<Cursus>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Cursus>;
    getAll(): Promise<Cursus[]>;
    update(payload: CursusUpdatePayload): Promise<Cursus>;
}
