import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from '@product/data';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class ConsumptionCreatePayload {

  @ApiProperty()
  order_date: Date;
  @ApiProperty()
  delivery_date: Date;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  is_reserved: boolean;
  @ApiProperty()
  is_delivered: boolean;
  @ApiProperty()
  type: ProductType;

  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.CONSUMPTION_IS_MISSING })
    // on stock l'emplacement sous forme de chaine de caractère
  shelve: string;

  @ApiProperty()
  @IsNotEmpty({ message: ApiCodeResponse.CONSUMPTION_IS_MISSING })
    // on stock l'id comme ca on peut y retourner.
  shelve_reference: string;
}