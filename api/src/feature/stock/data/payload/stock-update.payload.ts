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