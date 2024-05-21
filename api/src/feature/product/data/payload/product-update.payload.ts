import { ApiCodeResponse } from "@common/api";
import { IsNotEmpty } from "class-validator";
import { ProductType } from "../enum";

export class ProductUpdatePayload{

    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_ID_MISSING_ERROR })
    product_id: string;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TITLE_MISSING_ERROR})
    title: string;
    materials: string;
    treatment: string;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_THICKNESS_MISSING_ERROR })
    thickness: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_WIDTH_MISSING_ERROR })
    width: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_HEIGHT_MISSING_ERROR })
    height: number;
    price: number;
    @IsNotEmpty({ message: ApiCodeResponse.PRODUCT_TYPE_MISSING_ERROR })
    type: ProductType;

}