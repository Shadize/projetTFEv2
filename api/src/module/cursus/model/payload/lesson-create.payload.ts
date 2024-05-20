import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiCodeResponse } from "@common/api";
import { Cursus } from "../entity";

export class LessonCreatePayload {
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.LESSON_TITLE_LENGTH_ERROR})
  @Length(1,50,{message:ApiCodeResponse.LESSON_TITLE_MISSING_ERROR})
  title: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsOptional()
  file: string;

  @IsOptional()
  @ApiProperty()
  learning_achievement: string;

  @IsOptional()
  @ApiProperty()
  session_date: string;
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.LESSON_CURSUS_LENGTH_ERROR})
  cursus: Cursus;

}