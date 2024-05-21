import { Module } from '@nestjs/common';
import { StockController } from './controller/stock.controller';
import { StockService } from './service/stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '@stock/data';

@Module({
  imports:[TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
