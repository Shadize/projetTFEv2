import { Module } from '@nestjs/common';
import { ConsumptionController } from './controller/consumption.controller';
import { ConsumptionService } from './service/consumption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from '@consumption/data';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption])],
  controllers: [ConsumptionController],
  exports: [ConsumptionService],
  providers: [ConsumptionService]
})
export class ConsumptionModule {
}
