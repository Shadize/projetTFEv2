import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Lesson } from "../model";
import { Repository } from "typeorm";
import { LessonCreatePayload, LessonUpdatePayload } from "../model/payload";
import { Builder } from "builder-pattern";
import { ulid } from "ulid";
import {
  LessonCreateException,
  LessonDeleteException,
  LessonListException,
  LessonNotFoundException,
  LessonUpdateException
} from "../exception";
import { isNil } from "lodash";

@Injectable()
export class LessonService {
  constructor(@InjectRepository(Lesson) private readonly repository: Repository<Lesson>) {

  }

  async create(payload: LessonCreatePayload): Promise<Lesson> {
    try {
      const newLesson: Lesson = Object.assign(new Lesson(), Builder<Lesson>()
        .lesson_id(ulid())
        .title(payload.title)
        .description(payload.description)
        .file(payload.file)
        .learning_achievement(payload.learning_achievement)
        .cursus(payload.cursus)
        .build());
      return await this.repository.save(newLesson);

    } catch (e) {
      console.log(e);
      throw new LessonCreateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Lesson = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new LessonDeleteException();
    }
  }

  async detail(id: string): Promise<Lesson> {
    const result: Lesson = await this.repository.findOne({ where: { lesson_id: id } });
    if (!(isNil(result))) {
      return result;
    }
    throw new LessonNotFoundException();
  }

  async getAll(): Promise<Lesson[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new LessonListException();
    }
  }

  async update(payload: LessonUpdatePayload): Promise<Lesson> {
    try {
      let detail: Lesson = await this.detail(payload.lesson_id);
      detail.title = payload.title;
      detail.description = payload.description;
      detail.file = payload.file;
      detail.learning_achievement = payload.learning_achievement;
      detail.cursus = payload.cursus;
      return await this.repository.save(detail);
    } catch (e) {
      console.log(e);
      throw new LessonUpdateException();
    }
  }
}
