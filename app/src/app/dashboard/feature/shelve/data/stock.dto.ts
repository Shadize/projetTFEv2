import {ProductDto} from '@product-feature';

export interface StockDto {
  stock_id: string;
  location: string;
  rack: string;
  floor: string;
  nb_items_max: number;
  section: Section;
  product: ProductDto
}
