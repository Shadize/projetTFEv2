import { Injectable, Logger } from '@nestjs/common';
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
import { ShelveService } from '@stock/service/shelve.service';
import { StockDoorService } from '@stock/service/stock-door.service';

@Injectable()
export class StockService {
  private readonly logger = new Logger(StockService.name);

  constructor(@InjectRepository(Stock) private readonly repository: Repository<Stock>, private readonly shelveService: ShelveService, private readonly doorService: StockDoorService) {
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
    const result: Stock = await this.repository.findOne({ where: { stock_id: id }, relations: { shelves: true } });
    if (!(isNil(result))) {
      return result;
    }
    throw new StockNotFoundException();
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Stock = await this.detail(id);
      await this.shelveService.deleteForStock(detail);
      await this.doorService.deleteForStock(detail);
      await this.repository.remove(detail);
    } catch (e) {
      throw new StockDeleteException();
    }
  }

  async create(user: Credential, payload: StockCreatePayload): Promise<Stock> {
    try {
      console.log(user);
      const newStock: Stock = Builder<Stock>()
        .stock_id(ulid())
        .section(user.section)
        .width(payload.width)
        .height(payload.height)
        .title(payload.title)
        .scale(payload.scale)
        .build();
      const stock = await this.repository.save(newStock);
      await this.shelveService.setStockShelve(stock, payload.shelves);
      await this.doorService.setStockDoor(stock, payload.doors);
      return await this.detail(stock.stock_id);
    } catch (e) {
      this.logger.error(e);
      throw new StockCreateException();
    }

  }

  async update(payload: StockUpdatePayload): Promise<Stock> {
    try {
      let detail: Stock = await this.detail(payload.stock_id);
      detail.title = payload.title;
      await this.repository.save(detail);
      await this.shelveService.setStockShelve(detail, payload.shelves);
      await this.doorService.setStockDoor(detail, payload.doors);
      return await this.detail(payload.stock_id);
    } catch (e) {
      this.logger.error(e);
      throw new StockUpdateException();
    }
  }

}
