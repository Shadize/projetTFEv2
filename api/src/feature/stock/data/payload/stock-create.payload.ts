import { ProductType } from '@product/data';
import { Section } from '@common/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class StockCreatePayload {
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.STOCK_LOCATION_IS_EMPTY})
  location: string;
  @ApiProperty()
  rack: string;
  @ApiProperty()
  floor: string;
  @ApiProperty()
  nb_items_max: number;
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.STOCK_SECTION_IS_EMPTY})
  section: Section;
}