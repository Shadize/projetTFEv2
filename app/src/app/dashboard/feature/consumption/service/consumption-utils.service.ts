import {ConsumptionKeyForm} from './../data/enum/consumption-key-form.enum';
import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {
  Consumption,
  ConsumptionCreatePayload,
  ConsumptionDto, ConsumptionForm,
  ConsumptionKey,
  ConsumptionStatus
} from '@consumption-feature';
import {CredentialUtilService} from '@security';
import {Product, ProductType} from '@product-feature';
import {
  FieldSelectOption,
  FieldTypeConfig,
  FormConfig,
  FormValidatorsConfig
} from 'app/shared/ui/form/data/config/form.config';
import {Validators} from '@angular/forms';
import {CellActionDefinition, DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {ConsumptionType} from '../data/enum/consumption-type.enum';
import {Shelve} from '../../shelve/data';
import {ConsumptionAction} from '../data/enum/consumption-action';
import {format} from 'date-fns';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionUtilsService
  implements BusinessUtils<Consumption, ConsumptionDto> {
  private credentialUtils: CredentialUtilService = inject(
    CredentialUtilService
  );

  fromDTO(dto: ConsumptionDto): Consumption {
    const author = this.credentialUtils.fromDTO(dto.author);
    return {
      author,
      delivery_date: dto.delivery_date,
      order_date_str: format(dto.order_date, 'dd-MM-yyyy'),
      delivery_date_str: dto.delivery_date ? format(dto.order_date, 'dd-MM-yyyy') : '-',
      id: dto.consumption_id,
      isEmpty: false,
      is_delivered: dto.is_delivered,
      is_reserved: dto.is_reserved,
      consumption_type: dto.is_delivered
        ? ConsumptionType.DIRECT_REMOVE
        : ConsumptionType.RESERVATION,
      order_date: dto.order_date,
      quantity: dto.quantity,
      shelve: dto.shelve,
      shelve_reference: dto.shelve_reference,
      status: dto.status,
      str: `${author.username} - ${dto.type}`,
      type: dto.type,
      productName: dto.productName,
    };
  }

  getEmptyFormData(): ConsumptionForm {
    return {
      consumption_type: ConsumptionType.RESERVATION,
      delivery_date: '',
      is_delivered: false,
      order_date: format(new Date(), 'dd-MM-yyyy'),
      qty: 1

    }
  }

  getEmpty(): Consumption {
    return {
      author: this.credentialUtils.getEmpty(),
      delivery_date_str: '',
      order_date_str: '',
      delivery_date: new Date(),
      id: '',
      productName: '',
      isEmpty: true,
      is_delivered: false,
      is_reserved: false,
      order_date: this.formatDate(new Date()),
      quantity: 0,
      shelve: '',
      shelve_reference: '',
      status: ConsumptionStatus.ACTIVE,
      str: 'app.common.empty',
      type: ProductType.PANEL,
      consumption_type: ConsumptionType.RESERVATION,
    };
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
      type: business.type,
      productName: business.productName,
    };
  }

  fromDTOS(dtos: ConsumptionDto[]): Consumption[] {
    return dtos.map((d) => this.fromDTO(d));
  }

  toDTOS(business: Consumption[]): ConsumptionDto[] {
    return business.map((b) => this.toDTO(b));
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
          targetData: ConsumptionKey.ORDER_DATE_STR,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.DELIVERY_DATE_STR,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.PRODUCT_NAME,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: ConsumptionKey.STATUS,
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

  public getDataFormConfig(
    consumption: ConsumptionForm,
    submitTitle: string
  ): FormConfig {
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

      return {field, validators: fieldValidators};
    });

    const fieldTypesConfig: FieldTypeConfig[] = fields.map((field) => {
      let fieldType = ConsumptionKeyForm.DELIVERY_DATE ? 'date' : 'text';
      let fieldOptions: FieldSelectOption[] = [];
      let fieldReadOnly = false;
      switch (field) {
        case ConsumptionKeyForm.CONSUMPTION_TYPE:
          fieldType = 'select';
          fieldOptions = Object.values(ConsumptionType).map((o) => ({
            selected:
              (consumption.is_delivered && o === ConsumptionType.DIRECT_REMOVE) ||
              (!consumption.is_delivered && o === ConsumptionType.RESERVATION),
            value: o,
            label: `feature.consumption.type.${o.toLowerCase()}`,
          }));
          break;
        case ConsumptionKeyForm.ORDER_DATE:
          fieldReadOnly = true;
          break;
        case ConsumptionKeyForm.DELIVERY_DATE:
          fieldReadOnly = consumption.is_delivered;
          break;
        case ConsumptionKeyForm.QUANTITY:
          fieldType = 'number';
          break;
      }
      if (field === ConsumptionKeyForm.CONSUMPTION_TYPE) {
        fieldType = 'select';
        fieldOptions = Object.values(ConsumptionType).map((o) => ({
          selected:
            (consumption.is_delivered && o === ConsumptionType.DIRECT_REMOVE) ||
            (!consumption.is_delivered && o === ConsumptionType.RESERVATION),
          value: o,
          label: `feature.consumption.type.${o.toLowerCase()}`,
        }));
      } else if (field === ConsumptionKeyForm.ORDER_DATE) {
        fieldReadOnly = true;
      } else if (field === ConsumptionKeyForm.DELIVERY_DATE) {
        fieldReadOnly = consumption.is_delivered;
      }

      return {
        field,
        type: fieldType,
        options: fieldOptions,
        readOnly: fieldReadOnly,
      };
    });

    return {
      submitTitle,
      translateKey: 'feature.consumption.form.label.',
      data: consumption,
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig,
    };
  }

  genCreatePayload(
    formValue: any,
    quantity: number,
    shelve: Shelve,
    product: Product
  ): ConsumptionCreatePayload {
    return {
      order_date: formValue.order_date,
      delivery_date: formValue.delivery_date,
      quantity: quantity,
      is_reserved: formValue.consumption_type === 'RESERVATION' ? true : false,
      is_delivered: formValue.consumption_type === 'RESERVATION' ? false : true,
      type: formValue.type,
      status: ConsumptionStatus.ACTIVE,
      shelve: shelve.str,
      shelve_reference: shelve.locationReference,
      product,
      productName: product.str,
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
  stringToBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
  }

  private formatDate(date: Date): Date {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const [d, m, y] = formattedDate.split('-').map((num) => parseInt(num, 10));
    return new Date(y, m - 1, d);
  }
}
