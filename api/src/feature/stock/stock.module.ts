import { Module } from '@nestjs/common';
import { StockController } from '@stock/controller';
import { StockService } from '@stock/service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shelve, Stock } from '@stock/data';
import { ShelveService } from '@stock/service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock,Shelve])],
  controllers: [StockController],
  providers: [StockService, ShelveService]
})
export class StockModule {
}
