import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@product/data';
import { StockModule } from '@stock/stock.module';
import { ConsumptionModule } from '@consumption/consumption.module';

@Module({
  imports: [StockModule,ConsumptionModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {
}
