import {
  ConsumptionListException,
  ConsumptionNotFoundException,
  ConsumptionDeleteException,
  ConsumptionCreateException,
  ConsumptionListByShelveException,
  ConsumptionListByCredentialException,
  ConsumptionListByProductException
} from '@consumption/consumption.exception';
import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { Credential } from '@security/model';
import { Product } from '@product/data';


@Injectable()
export class ConsumptionService {
  private readonly logger = new Logger(ConsumptionService.name);

  constructor(@InjectRepository(Consumption) private readonly repository: Repository<Consumption>) {
  }

  async list(): Promise<Consumption[]> {
    try {
      return await this.repository.find();
    } catch (e) {
      throw new ConsumptionListException();
    }
  }

  async detail(id: string): Promise<Consumption> {
    const result: Consumption = await this.repository.findOne({ where: { consumption_id: id } });
    if (!(isNil(result))) {
      return result;
    }
    throw new ConsumptionNotFoundException();
  }

  async delete(id: string): Promise<void> {
    try {
      const detail: Consumption = await this.detail(id);
      await this.repository.remove(detail);
    } catch (e) {
      throw new ConsumptionDeleteException();
    }
  }

  async create(payload: ConsumptionCreatePayload, user: Credential): Promise<Consumption> {
    try {
      const newProduct: Consumption = Builder<Consumption>()
        .consumption_id(ulid())
        .order_date(payload.order_date)
        .delivery_date(payload.delivery_date)
        .quantity(payload.quantity)
        .is_reserved(payload.is_reserved)
        .is_delivered(payload.is_delivered)
        .productName(payload.productName)
        .author(user)
        .product(payload.product)
        .shelve(payload.shelve)
        .shelve_reference(payload.shelve_reference)
        .build();
      return await this.repository.save(newProduct);
    } catch (e) {
      this.logger.error(e);
      throw new ConsumptionCreateException();
    }
  }

  async findByShelveId(shelveId: string): Promise<Consumption[]> {
    try {
      return await this.repository.find({ where: { shelve_reference: shelveId } });
    } catch (e) {
      throw new ConsumptionListByShelveException();
    }
  }

  async findByProductById(productId: string): Promise<Consumption[]> {
    try {
      return await this.repository.createQueryBuilder('consumption')
        .where('consumption.product.product_id = :productId', { productId })
        .getMany();
    } catch (e) {
      throw new ConsumptionListByProductException();
    }
  }
  

  async findByCredential(credential: Credential): Promise<Consumption[]> {
    let credential_id = credential.credential_id
    try {
      return await this.repository.createQueryBuilder('consumption')
      .where('consumption.author.credential_id = :credential_id', { credential_id })
      .getMany();
    } catch (e) {
      throw new ConsumptionListByCredentialException();
    }
  }

  async setForProduct(consumptions:Consumption[], product:Product):Promise<void>{
    console.log('consumptions', consumptions);
    for (let consumption of consumptions) {
      consumption.product = product;
      consumption.consumption_id = consumption.consumption_id ? consumption.consumption_id : ulid();

      await this.repository.save(consumption);
    }
  }

}
