import { Stock } from '@stock/data';
import { Repository } from 'typeorm';
import { StockDoor } from '@stock/data/entity/stock-door.entity';
export declare class StockDoorService {
    private readonly repository;
    constructor(repository: Repository<StockDoor>);
    setStockDoor(detail: Stock, shelves: StockDoor[]): Promise<void>;
    deleteForStock(stock: Stock): Promise<void>;
}
