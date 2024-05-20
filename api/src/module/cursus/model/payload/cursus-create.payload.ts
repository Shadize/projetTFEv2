import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiCodeResponse } from "@common/api";

export class CursusCreatePayload {
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