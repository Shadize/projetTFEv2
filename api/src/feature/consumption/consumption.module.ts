import { Module } from '@nestjs/common';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumption } from '@consumption/data';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption])],
  controllers: [ConsumptionController],
  providers: [ConsumptionService]
})
export class ConsumptionModule {
}
