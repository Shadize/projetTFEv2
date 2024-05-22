import { Section } from '@common/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';
import { Shelve } from '@stock/data';

export class StockCreatePayload {

  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_TITLE_IS_EMPTY })
  title:string;
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_WIDTH_IS_EMPTY })
  width:number;
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_HEIGHT_IS_EMPTY })
  height:number;
  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_SCALE_IS_EMPTY })
  scale:number;
  @ApiProperty()
  shelves: Shelve[];
}