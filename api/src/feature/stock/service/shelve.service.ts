import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Shelve,
  ShelveCreatePayload,
  ShelveUpdatePayload,
  Stock,
  StockCreatePayload,
  StockUpdatePayload
} from '@stock/data';
import { Repository } from 'typeorm';
import { Credential } from '@security/model';
import { isNil } from 'lodash';
import {
  StockCreateException,
  StockDeleteException,
  StockListException,
  StockNotFoundException, StockUpdateException
} from '@stock/stock.exception';
import { Builder } from 'builder-pattern';
import { ulid } from 'ulid';

@Injectable()
export class ShelveService {

  constructor(@InjectRepository(Shelve) private readonly repository: Repository<Shelve>) {
  }

  async list(): Promise<Shelve[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new StockListException();
    }
  }

  async detail(id: string): Promise<Shelve> {
    const result: Shelve = await this.repository.findOne({ where: { shelve_id: id }, relations: { product: true } });
    if (!(isNil(result))) {
      return result;
    }
    throw new StockNotFoundException();
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Shelve = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new StockDeleteException();
    }
  }

  async create(payload: ShelveCreatePayload): Promise<Shelve> {
    try {
      const newShelve: Shelve = Builder<Shelve>()
        .shelve_id(ulid())
        .location(payload.location)
        .rack(payload.rack)
        .floor(payload.floor)
        .nb_items_max(payload.nb_items_max)
        .build();
      return await this.repository.save(newShelve);
    } catch (e) {
      throw new StockCreateException();
    }

  }

  async update(payload: ShelveUpdatePayload): Promise<Shelve> {
    try {
      let detail: Shelve = await this.detail(payload.shelve_id);
      detail.location = payload.location;
      detail.rack = payload.rack;
      detail.floor = payload.floor;
      detail.nb_items_max = payload.nb_items_max;
      detail.product = payload.product;
      return await this.repository.save(detail);
    } catch (e) {
      throw new StockUpdateException();
    }
  }

}