import { ApiProperty } from "@nestjs/swagger";
import { ProductType } from "../enum";
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from "@common/api";
import { Shelve } from "@stock/data";


export class ProductCreatePayload{

    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TITLE_MISSING_ERROR})
    title: string;
    @ApiProperty()
    quantity : number;
    @ApiProperty()
    materials : string;
    @ApiProperty()
    treatment: string;
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_THICKNESS_MISSING_ERROR })
    thickness: number;
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_WIDTH_MISSING_ERROR })
    width: number;
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_HEIGHT_MISSING_ERROR })
    height: number;    
    @ApiProperty()
    price: number;
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_SHELVE_MISSING_ERROR })
    shelve: Shelve;
    @ApiProperty()
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TYPE_MISSING_ERROR })
    type: ProductType;

}