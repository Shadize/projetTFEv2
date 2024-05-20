import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LessonService } from "../service";
import { Lesson, LessonCreatePayload, LessonUpdatePayload } from "../model";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiBearerAuth('access-token')
@ApiTags('Leçon')
@Controller('lesson')
export class LessonController {
  constructor(private readonly service: LessonService) {
  }

  @Post('create')
  create(@Body() payload: LessonCreatePayload): Promise<Lesson> {
    return this.service.create(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Lesson> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(): Promise<Lesson[]> {
    return this.service.getAll();
  }

  @Put('update')
  update(@Body() payload: LessonUpdatePayload): Promise<Lesson> {
    return this.service.update(payload);
  }}
