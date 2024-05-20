import { Product, ProductType } from '@product/data';
import { Section } from '@common/data';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class StockUpdatePayload {
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_ID_MISSING_ERROR })
  stock_id: string;
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_LOCATION_IS_EMPTY })
  location: string;
  rack: string;
  floor: string;
  nb_items_max: number;
  product: Product;
}