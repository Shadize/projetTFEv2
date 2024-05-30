import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Credential } from '@security/model';
import { User } from '@common/config';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConsumptionService } from '@consumption/service';

@ApiBearerAuth('access-token')
@ApiTags('Consumption')
@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly service: ConsumptionService) {
  }
  @Post('create')
  create(@Body() payload: ConsumptionCreatePayload, @User() user: Credential) {
    return this.service.create(payload,user);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Consumption> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(): Promise<Consumption[]> {
    return this.service.list();
  }

  @Get('shelve/:shelveId')
  getByShelveId(@Param('shelveId') shelveId: string): Promise<Consumption[]> {
    return this.service.findByShelveId(shelveId);
  }
}
