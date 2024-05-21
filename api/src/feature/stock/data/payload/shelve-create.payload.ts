import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';
import { Stock } from '@stock/data';

export class ShelveCreatePayload {
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_LOCATION_IS_EMPTY })
  location: Stock;
  @ApiProperty()
  rack: string;
  @ApiProperty()
  floor: string;
  @ApiProperty()
  nb_items_max: number;
}