import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ProductService {

  constructor(private readonly shelveService: ShelveService,@InjectRepository(Product) private readonly repository: Repository<Product>) {
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
        .price(payload.price)
        .type(payload.type)
        .build();
      const product =  await this.repository.save(newProduct);
      await this.shelveService.linkProduct(product, payload.shelve);
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

      const product =  await this.repository.save(detail);
      console.log('payload.shelve', payload.shelve);
      await this.shelveService.linkProduct(product, payload.shelve);
      return product
    } catch (e) {
      throw new StockUpdateException();
    }
  }
}