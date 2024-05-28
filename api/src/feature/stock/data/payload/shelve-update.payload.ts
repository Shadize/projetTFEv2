import { Product, ProductType } from '@product/data';
import { Section } from '@common/data';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';
import { Stock } from '@stock/data';

export class ShelveUpdatePayload {
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_ID_MISSING_ERROR })
  shelve_id: string;
  @IsNotEmpty({ message: ApiCodeResponse.STOCK_LOCATION_IS_EMPTY })
  location: Stock;
  rack: string;
  floor: string;
  nb_items_max: number;
  products: Product[];
}