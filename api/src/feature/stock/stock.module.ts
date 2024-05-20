import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from '@stock/data';

@Module({
  imports:[TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
