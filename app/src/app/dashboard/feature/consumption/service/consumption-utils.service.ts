import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {Consumption, ConsumptionDto, ConsumptionStatus} from '@consumption-feature';
import {CredentialUtilService} from '@security';
import {ProductType} from '@product-feature';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionUtilsService implements BusinessUtils<Consumption, ConsumptionDto> {
  private credentialUtils: CredentialUtilService = inject(CredentialUtilService);

  fromDTO(dto: ConsumptionDto): Consumption {
    const author = this.credentialUtils.fromDTO(dto.author);
    return {
      author,
      delivery_date: dto.delivery_date,
      id: dto.consumption_id,
      isEmpty: false,
      is_delivered: dto.is_delivered,
      is_reserved: dto.is_reserved,
      order_date: dto.order_date,
      quantity: dto.quantity,
      shelve: dto.shelve,
      shelve_reference: dto.shelve_reference,
      status: dto.status,
      str: `${author.username} - ${dto.type}`,
      type: dto.type
    }
  }

  getEmpty(): Consumption {
    return {
      author: this.credentialUtils.getEmpty(),
      delivery_date: new Date(),
      id: '',
      isEmpty: true,
      is_delivered: false,
      is_reserved: false,
      order_date: new Date(),
      quantity: 0,
      shelve: '',
      shelve_reference: '',
      status: ConsumptionStatus.ACTIVE,
      str: 'app.common.empty',
      type: ProductType.PANEL
    }
  }

  toDTO(business: Consumption): ConsumptionDto {
    return {
      author: this.credentialUtils.toDTO(business.author),
      delivery_date: business.delivery_date,
      consumption_id: business.id,
      is_delivered: business.is_delivered,
      is_reserved: business.is_reserved,
      order_date: business.order_date,
      quantity: business.quantity,
      shelve: business.shelve,
      shelve_reference: business.shelve_reference,
      status: business.status,
      type: business.type
    }
  }

  fromDTOS(dtos: ConsumptionDto[]): Consumption[] {
    return dtos.map(d => this.fromDTO(d));
  }

  toDTOS(business: Consumption[]): ConsumptionDto[] {
    return business.map(b => this.toDTO(b));
  }

}
