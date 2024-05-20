import { Repository } from "typeorm";
import { Cursus } from "../model";
import { CursusCreatePayload, CursusUpdatePayload } from '../model';
export declare class CursusService {
    private readonly repository;
    constructor(repository: Repository<Cursus>);
    create(payload: CursusCreatePayload): Promise<Cursus>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Cursus>;
    getAll(): Promise<Cursus[]>;
    update(payload: CursusUpdatePayload): Promise<Cursus>;
}
