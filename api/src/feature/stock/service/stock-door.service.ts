import { Injectable } from '@nestjs/common';
import { Shelve, Stock } from '@stock/data';
import { ulid } from 'ulid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockDoor } from '@stock/data/entity/stock-door.entity';

@Injectable()
export class StockDoorService {

  constructor(@InjectRepository(StockDoor) private readonly repository: Repository<StockDoor>) {
  }

  async setStockDoor(detail: Stock, shelves: StockDoor[]): Promise<void> {
    for (let door of shelves) {
      door.location = detail;
      door.stock_door_id = door.stock_door_id ? door.stock_door_id : ulid();
      await this.repository.save(door);
    }
  }

  async deleteForStock(stock: Stock): Promise<void> {
    for (let door of stock.doors) {
      await this.repository.remove(door);
    }
  }
}
