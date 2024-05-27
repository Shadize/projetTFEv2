import { Module } from '@nestjs/common';
import { StockController } from '@stock/controller';
import { ShelveService, StockService, StockDoorService } from '@stock/service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelve, Stock, StockDoor } from '@stock/data';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Shelve, StockDoor])],
  controllers: [StockController],
  exports: [ShelveService],
  providers: [StockService, ShelveService, StockDoorService]
})
export class StockModule {
}
