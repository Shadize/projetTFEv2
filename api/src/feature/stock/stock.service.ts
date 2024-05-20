import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock, StockCreatePayload, StockUpdatePayload } from '@stock/data';
import { isNil } from 'lodash';
import {
  StockCreateException,
  StockDeleteException,
  StockListException,
  StockNotFoundException, StockUpdateException
} from '@stock/stock.exception';
import { Builder } from 'builder-pattern';
import { ulid } from 'ulid';
import { Credential } from '@security/model';

@Injectable()
export class StockService {
  constructor(@InjectRepository(Stock) private readonly repository: Repository<Stock>) {
  }

  async list(user: Credential): Promise<Stock[]> {
    try {
      if (isNil(user.section)) {
        return await this.repository.find();
      }
      return await this.repository.find({ where: { section: user.section } });
    } catch (e) {
      throw new StockListException();
    }
  }

  async detail(id: string): Promise<Stock> {
    const result: Stock = await this.repository.findOne({ where: { stock_id: id }, relations: { product: true } });
    if (!(isNil(result))) {
      return result;
    }
    throw new StockNotFoundException();
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Stock = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new StockDeleteException();
    }
  }

  async create(payload: StockCreatePayload): Promise<Stock> {
    try {
      const newStock: Stock = Builder<Stock>()
        .stock_id(ulid())
        .location(payload.location)
        .rack(payload.rack)
        .floor(payload.floor)
        .nb_items_max(payload.nb_items_max)
        .section(payload.section)
        .build();
      return await this.repository.save(newStock);
    } catch (e) {
      throw new StockCreateException();
    }

  }

  async update(payload: StockUpdatePayload): Promise<Stock> {
    try {
      let detail: Stock = await this.detail(payload.stock_id);
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
