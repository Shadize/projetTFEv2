import { ApiCodeResponse } from "@common/api";
import { IsNotEmpty } from "class-validator";
import { ProductType } from "../enum";
import { Shelve } from "@stock/data";

export class ProductUpdatePayload{

    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_ID_MISSING_ERROR })
    product_id: string;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TITLE_MISSING_ERROR})
    title: string;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_QUANTITY_MISSING_ERROR})
    qunatity: string;
    materials: string;
    treatment: string;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_THICKNESS_MISSING_ERROR })
    thickness: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_WIDTH_MISSING_ERROR })
    width: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_HEIGHT_MISSING_ERROR })
    height: number;
    price: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_SHELVE_MISSING_ERROR })
    shelve: Shelve;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TYPE_MISSING_ERROR })
    type: ProductType;

}