import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Builder } from "builder-pattern";

import { isNil } from "lodash";
import { Cursus } from "../model";
import { CursusCreatePayload, CursusUpdatePayload } from "../model/payload";
import { ulid } from "ulid";
import {
  CursusCreateException,
  CursusDeleteException,
  CursusListException,
  CursusNotFoundException, CursusUpdateException
} from "../exception";

@Injectable()
export class CursusService {
  constructor(@InjectRepository(Cursus) private readonly repository: Repository<Cursus>) {

  }

  async create(payload: CursusCreatePayload): Promise<Cursus> {
    try {
      const newCursus: Cursus = Object.assign(new Cursus(), Builder<Cursus>()
        .cursus_id(ulid())
        .title(payload.title)
        .description(payload.description)
        .code(payload.code)
        .contract(payload.contract)
        .build());
      return await this.repository.save(newCursus);

    } catch (e) {
      console.log(e);
      throw new CursusCreateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail:Cursus = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new CursusDeleteException();
    }
  }

  async detail(id: string): Promise<Cursus> {
    const result:Cursus = await this.repository.findOne({ where: { cursus_id: id }, relations: { lessons: true } });
    if (!(isNil(result))) {
      return result;
    }
    throw new CursusNotFoundException();
  }

  async getAll(): Promise<Cursus[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new CursusListException();
    }
  }

  async update(payload: CursusUpdatePayload): Promise<Cursus> {
    try {
      let detail:Cursus = await this.detail(payload.cursus_id);
      detail.title = payload.title;
      detail.description = payload.description;
      detail.code = payload.code;
      detail.contract = payload.contract;
      return await this.repository.save(detail);
    } catch (e) {
      console.log(e);
      throw new CursusUpdateException();
    }
  }
}
