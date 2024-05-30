import { ConsumptionKeyForm } from './../data/enum/consumption-key-form.enum';
import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {Consumption, ConsumptionCreatePayload, ConsumptionDto, ConsumptionKey, ConsumptionStatus, ConsumptionUpdateePayload} from '@consumption-feature';
import {CredentialUtilService} from '@security';
import {ProductType} from '@product-feature';
import { FieldSelectOption, FieldTypeConfig, FormConfig, FormValidatorsConfig } from 'app/shared/ui/form/data/config/form.config';
import { Validators } from '@angular/forms';
import { DataTableConfig, CellActionDefinition, MinimalVisibilityWidth } from '@shared';
import { ConsumptionType } from '../data/enum/consumption-type.enum';
import { Shelve } from '../../shelve/data';
import { ConsumptionAction } from '../data/enum/consumption-action';

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

  
  public getDataTableConfig(
    consumptions: Consumption[],
    isAdmin: boolean
  ): DataTableConfig {
    let actions: CellActionDefinition[] = [
      {
        icon: 'fa-solid fa-trash',
        action: ConsumptionAction.DELETE,
      },
      {
        icon: 'fa-solid fa-regular fa-truck',
        action: ConsumptionAction.DELIVERED,
      },
    ];
    return {
      translateKey: 'admin-feature-consumption.table.label.',
      data: consumptions,
      cellDefinitions: [
        {
          targetData: ConsumptionKey.ORDER_DATE,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.DELIVERY_DATE,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.TYPE,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.STATUS,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.IS_DELIVERED,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.IS_RESERVED,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: '',
          actions,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: true,
        },
      ],
    };
  }

  

  public getDataFormConfig(consumption: Consumption, submitTitle:string): FormConfig {
    const fields = Object.values(ConsumptionKeyForm);

    const validatorsConfig: FormValidatorsConfig[] = fields.map((field) => {
      let fieldValidators = [];

      switch (field) {
        case ConsumptionKeyForm.ORDER_DATE:
          fieldValidators.push(Validators.required);
          break;
        case ConsumptionKeyForm.CONSUMPTION_TYPE:
          fieldValidators.push(Validators.required);
          break;
        case ConsumptionKeyForm.DELIVERY_DATE:
          fieldValidators.push(Validators.required);
          break;
        default:
          // Add default validators if needed
          break;
      }

      return { field, validators: fieldValidators };
    });

    const fieldTypesConfig: FieldTypeConfig[] = fields.map((field) => {
      let fieldType = 'text';
      let fieldOptions: FieldSelectOption[] = [];
      let fieldReadOnly = false;

      if (field === ConsumptionKeyForm.CONSUMPTION_TYPE) {
        fieldType = 'select';
        fieldOptions = Object.values(ConsumptionType).map((o) => ({
          selected: (consumption.is_delivered && o === ConsumptionType.DIRECT_REMOVE) ||
                    (!consumption.is_delivered && o === ConsumptionType.RESERVATION),
          value: o,
          label: `feature.consumption.type.${o.toLowerCase()}`,
        }));
      } 
      else if (field === ConsumptionKeyForm.ORDER_DATE) {
        fieldReadOnly = true;
      }
      else if (field === ConsumptionKeyForm.DELIVERY_DATE) {
        fieldReadOnly = consumption.is_delivered;
      }



      return { field, type: fieldType, options: fieldOptions , readOnly: fieldReadOnly};
    });

    return {
      submitTitle,
      data: consumption,
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig,
    };
  }

  genCreatePayload(formValue: any, quantity: number, shelve : Shelve): ConsumptionCreatePayload {

    
    return {
      order_date: formValue.order_date,
      delivery_date: formValue.delivery_date,
      quantity: quantity,
      is_reserved: formValue.consumption_type === "RESERVATION" ? true : false,
      is_delivered: formValue.consumption_type === "RESERVATION" ? false : true,
      type: formValue.type,
      status: ConsumptionStatus.ACTIVE,
      shelve: shelve.str,
      shelve_reference: shelve.locationReference

      
    };
  }

  /*
  genUpdatePayload(consumption: Consumption): ConsumptionUpdateePayload {
    return {
      ...this.genCreatePayload(consumption),
      consumption_id : consumption.id

    };
  }
  */
  stringToBoolean(value: string): boolean{
    return value.toLowerCase() === 'true';
  }
}
