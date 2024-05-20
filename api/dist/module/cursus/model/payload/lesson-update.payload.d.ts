import { Cursus } from "../entity";
export declare class LessonUpdatePayload {
    lesson_id: string;
    title: string;
    description: string;
    file: string;
    learning_achievement: string;
    session_date: string;
    cursus: Cursus;
}
