import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@product/data';
import { ProductCreatePayload, ProductUpdatePayload } from '@product/data/payload';
import {
  ProductCreateException,
  ProductDeleteException,
  ProductListException,
  ProductNotFoundException
} from '@product/product.exception';
import { StockUpdateException } from '@stock/stock.exception';
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { ShelveService } from '@stock/service';
import { ConsumptionService } from '@consumption/service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly consumptionService: ConsumptionService, @InjectRepository(Product) private readonly repository: Repository<Product>) {
  }

  async list(): Promise<Product[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new ProductListException();
    }
  }

  async detail(id: string): Promise<Product> {
    const result: Product = await this.repository.findOne({ where: { product_id: id } });
    if (!(isNil(result))) {
      return result;
    }
    throw new ProductNotFoundException();
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Product = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new ProductDeleteException();
    }
  }

  async create(payload: ProductCreatePayload): Promise<Product> {
    try {
      const newProduct: Product = Builder<Product>()
        .product_id(ulid())
        .title(payload.title)
        .materials(payload.materials)
        .treatment(payload.treatment)
        .thickness(payload.thickness)
        .width(payload.width)
        .height(payload.height)
        .shelve(payload.shelve)
        .quantity(payload.quantity)
        .price(payload.price)
        .type(payload.type)
        .build();
      const product = await this.repository.save(newProduct);
      return product;
    } catch (e) {
      throw new ProductCreateException();
    }

  }

  async update(payload: ProductUpdatePayload): Promise<Product> {
    try {
      let detail: Product = await this.detail(payload.product_id);
      detail.title = payload.title;
      detail.quantity = payload.quantity;
      detail.materials = payload.materials;
      detail.treatment = payload.treatment;
      detail.thickness = payload.thickness;
      detail.width = payload.width;
      detail.height = payload.height;
      detail.price = payload.price;
      detail.type = payload.type;
      detail.shelve = payload.shelve;
      const product = await this.repository.save(detail);
      await this.consumptionService.setForProduct(payload.consumptions, product);
      return product;
    } catch (e) {
      this.logger.error(e);
      throw new StockUpdateException();
    }
  }
}