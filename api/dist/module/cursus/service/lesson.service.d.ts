import { Lesson } from "../model";
import { Repository } from "typeorm";
import { LessonCreatePayload, LessonUpdatePayload } from "../model/payload";
export declare class LessonService {
    private readonly repository;
    constructor(repository: Repository<Lesson>);
    create(payload: LessonCreatePayload): Promise<Lesson>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Lesson>;
    getAll(): Promise<Lesson[]>;
    update(payload: LessonUpdatePayload): Promise<Lesson>;
}
