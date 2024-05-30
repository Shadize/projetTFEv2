import { ConsumptionListException, ConsumptionNotFoundException, ConsumptionDeleteException, ConsumptionCreateException, ConsumptionListByShelveException } from '@consumption/consumption.exception';
import { Consumption, ConsumptionCreatePayload } from '@consumption/data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';


@Injectable()
export class ConsumptionService {

    constructor(@InjectRepository(Consumption) private readonly repository: Repository<Consumption>){}

    async list(): Promise<Consumption[]> {
        try {
          return await this.repository.find();
        } catch (e) {
          throw new ConsumptionListException();
        }
      }
    
      async detail(id: string): Promise<Consumption> {
        const result: Consumption = await this.repository.findOne({ where: { consumption_id: id }});
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
    
      async create(payload: ConsumptionCreatePayload): Promise<Consumption> {
        try {
          const newProduct: Consumption = Builder<Consumption>()
            .consumption_id(ulid())
            .order_date(payload.order_date)
            .delivery_date(payload.delivery_date)
            .quantity(payload.quantity)
            .is_reserved(payload.is_reserved)
            .is_delivered(payload.is_delivered)
            .type(payload.type)
            .shelve_reference(payload.shelve_reference)
            .build();
          return await this.repository.save(newProduct);
        } catch (e) {
          throw new ConsumptionCreateException();
        }
      }

      async findByShelveId(shelveId: string): Promise<Consumption[]> {
        try {
          return await this.repository.find({ where: { shelve_reference : shelveId } });
        } catch (e) {
          throw new ConsumptionListByShelveException();
        }
      }
    
}
