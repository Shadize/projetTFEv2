import { Section } from '@common/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class StockCreatePayload {
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_SECTION_IS_EMPTY })
  section: Section;
}