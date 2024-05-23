import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelve, ShelveCreatePayload, ShelveUpdatePayload, Stock } from '@stock/data';
import { Repository } from 'typeorm';
import { isNil } from 'lodash';
import {
  StockCreateException,
  StockDeleteException,
  StockListException,
  StockNotFoundException,
  StockUpdateException
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
      detail.product = payload.product;
      return await this.repository.save(detail);
    } catch (e) {
      throw new StockUpdateException();
    }
  }

  async setStockShelve(detail: Stock, shelves: Shelve[]): Promise<void> {
    for (let shelve of shelves) {
      shelve.location = detail;
      shelve.shelve_id = shelve.shelve_id ? shelve.shelve_id : ulid();
      console.log(shelve);
      await this.repository.save(shelve);
    }
  }

  async deleteForStock(stock: Stock): Promise<void> {
    for (let shelve of stock.shelves) {
      shelve.product = null;
      await this.repository.save(shelve);
      await this.repository.remove(shelve);
    }

  }
}