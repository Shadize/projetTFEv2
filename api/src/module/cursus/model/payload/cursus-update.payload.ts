import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiCodeResponse } from "@common/api";

export class CursusUpdatePayload {
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.CURSUS_ID_LENGTH_ERROR})
  @Length(26,26,{message:ApiCodeResponse.CURSUS_ID_MISSING_ERROR})
  cursus_id: string;

  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.CURSUS_TITLE_LENGTH_ERROR})
  @Length(1,50,{message:ApiCodeResponse.CURSUS_TITLE_MISSING_ERROR})
  title: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsOptional()
  code: string;

  @IsOptional()
  @ApiProperty()
  contract: string;

}