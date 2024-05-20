import { BaseEntity } from "@common/model";
import { Lesson } from "./lesson.entity";
export declare class Cursus extends BaseEntity {
    cursus_id: string;
    title: string;
    description: string;
    code: string;
    contract: string;
    lessons: Lesson[];
}
