import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product, ProductCreatePayload, ProductUpdatePayload } from '@product/data';
import { ProductService } from '@product/service/product.service';

@ApiBearerAuth('access-token')
@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly service: ProductService) {
    }
  
    @Post('create')
    create(@Body() payload: ProductCreatePayload): Promise<Product> {
      return this.service.create(payload);
    }
  
    @Delete('delete/:id')
    delete(@Param('id') id: string): Promise<void> {
      return this.service.delete(id);
    }
  
    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Product> {
      return this.service.detail(id);
    }
  
    @Get('list')
    getAll(): Promise<Product[]> {
      return this.service.list();
    }
  
    @Put('update')
    update(@Body() payload: ProductUpdatePayload): Promise<Product> {
      return this.service.update(payload);
    }
}
