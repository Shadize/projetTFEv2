import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Cursus, CursusCreatePayload, CursusUpdatePayload } from "../model";
import { CursusService } from "../service";
@ApiBearerAuth('access-token')
@ApiTags('Cours')
@Controller('cursus')
export class CursusController {
  constructor(private readonly service: CursusService) {
  }

  @Post('create')
  create(@Body() payload: CursusCreatePayload): Promise<Cursus> {
    return this.service.create(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Cursus> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(): Promise<Cursus[]> {
    return this.service.getAll();
  }

  @Put('update')
  update(@Body() payload: CursusUpdatePayload): Promise<Cursus> {
    return this.service.update(payload);
  }
}
