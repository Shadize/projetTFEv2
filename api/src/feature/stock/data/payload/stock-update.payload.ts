import { Product, ProductType } from '@product/data';
import { Section } from '@common/data';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';
import { ApiProperty } from '@nestjs/swagger';
import { Shelve } from '@stock/data';

export class StockUpdatePayload {
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_ID_MISSING_ERROR })
  stock_id: string;

  @ApiProperty()
  shelves: Shelve[];
}