import { ProductType } from '@product/data';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class ConsumptionCreatePayload {
  consumption_id: string;
  order_date: Date;
  delivery_date: Date;
  quantity: number;
  is_reserved: boolean;
  is_delivered: boolean;
  type: ProductType;

  @IsNotEmpty({ message: ApiCodeResponse.CONSUMPTION_IS_MISSING })
    // on stock l'emplacement sous forme de chaine de caractère
  shelve: string;
  @IsNotEmpty({ message: ApiCodeResponse.CONSUMPTION_IS_MISSING })
    // on stock l'id comme ca on peut y retourner.
  shelve_reference: string;
}