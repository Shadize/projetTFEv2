import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StockService } from '@stock/stock.service';
import { Stock, StockCreatePayload, StockUpdatePayload } from '@stock/data';
import { User } from '@common/config';
import { Credential } from '@security/model';

@ApiBearerAuth('access-token')
@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly service: StockService) {
  }

  @Post('create')
  create(@Body() payload: StockCreatePayload): Promise<Stock> {
    return this.service.create(payload);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get('detail/:id')
  detail(@Param('id') id: string): Promise<Stock> {
    return this.service.detail(id);
  }

  @Get('list')
  getAll(@User() user:Credential): Promise<Stock[]> {
    return this.service.list(user);
  }

  @Put('update')
  update(@Body() payload: StockUpdatePayload): Promise<Stock> {
    return this.service.update(payload);
  }
}
