import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cursus, Lesson } from "./model";
import { CursusService } from './service/cursus.service';
import { LessonService } from './service/lesson.service';
import { CursusController } from './controller/cursus.controller';
import { LessonController } from './controller/lesson.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cursus,Lesson])],
  providers: [CursusService, LessonService],
  controllers: [CursusController, LessonController],})
export class CursusModule {}
