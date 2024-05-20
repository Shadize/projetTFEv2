import { LessonService } from "../service";
import { Lesson, LessonCreatePayload, LessonUpdatePayload } from "../model";
export declare class LessonController {
    private readonly service;
    constructor(service: LessonService);
    create(payload: LessonCreatePayload): Promise<Lesson>;
    delete(id: string): Promise<void>;
    detail(id: string): Promise<Lesson>;
    getAll(): Promise<Lesson[]>;
    update(payload: LessonUpdatePayload): Promise<Lesson>;
}
