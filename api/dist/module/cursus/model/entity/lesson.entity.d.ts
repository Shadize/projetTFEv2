import { BaseEntity } from "@common/model";
import { Cursus } from "./cursus.entity";
export declare class Lesson extends BaseEntity {
    lesson_id: string;
    title: string;
    description: string;
    file: string;
    learning_achievement: string;
    session_date: Date;
    cursus: Cursus;
}
