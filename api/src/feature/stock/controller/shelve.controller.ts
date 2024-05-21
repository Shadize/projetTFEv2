import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShelveService } from '@stock/service';
import { Shelve, ShelveCreatePayload, ShelveUpdatePayload } from '@stock/data';

@ApiBearerAuth('access-token')
@ApiTags('shelve')
@Controller('shelve')
export class ShelveController {
  constructor(private readonly service: ShelveService) {
  }

  @Post('create')
  create(@Body() payload: ShelveCreatePayload): Promise<Shelve> {
    return this.service.create(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Shelve> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(): Promise<Shelve[]> {
    return this.service.list();
  }

  @Put('update')
  update(@Body() payload: ShelveUpdatePayload): Promise<Shelve> {
    return this.service.update(payload);
  }
}
