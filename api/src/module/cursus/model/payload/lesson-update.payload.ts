import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { ApiCodeResponse } from "@common/api";
import { Cursus } from "../entity";

export class LessonUpdatePayload {
  @ApiProperty()
  @IsNotEmpty({message:ApiCodeResponse.LESSON_ID_LENGTH_ERROR})
  @Length(26,26,{message:ApiCodeResponse.LESSON_ID_MISSING_ERROR})
  lesson_id: string;
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
  @IsNotEmpty({message:ApiCodeResponse.LESSON_CURSUS_MISSING_ERROR})
  cursus: Cursus;

}