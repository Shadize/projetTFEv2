import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {
  Product,
  ProductAction,
  ProductDto,
  ProductKey,
  ProductKeyForm,
  ProductType,
} from '@product-feature';
import {ConsumptionUtilsService} from '@consumption-feature';
import {
  DataTableConfig,
  CellActionDefinition,
  MinimalVisibilityWidth,
} from '@shared';
import {
  FieldSelectOption,
  FieldTypeConfig,
  FormConfig,
  FormValidatorsConfig
} from 'app/shared/ui/form/data/config/form.config';
import {Validators} from '@angular/forms';
import {Stock} from '@shelve-feature';
import {flatten} from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ProductUtilsService implements BusinessUtils<Product, ProductDto> {
  private consumptionUtils: ConsumptionUtilsService = inject(
    ConsumptionUtilsService
  );

  fromDTO(dto: ProductDto): Product {
    return {
      consumptions: this.consumptionUtils.fromDTOS(dto.consumptions),
      height: dto.height,
      id: dto.product_id,
      isEmpty: false,
      materials: dto.materials,
      price: dto.price,
      title: dto.title,
      str: dto.title,
      thickness: dto.thickness,
      treatment: dto.treatment,
      type: dto.type,
      width: dto.width,
    };
  }

  public fromDTOS(dtos: ProductDto[]): Product[] {
    return dtos.map((d) => this.fromDTO(d));
  }

  getEmpty(): Product {
    return {
      consumptions: [],
      height: 0,
      id: '',
      title: '',
      isEmpty: true,
      materials: '',
      price: 0,
      str: 'app.common.empty',
      thickness: 0,
      treatment: '',
      type: ProductType.PANEL,
      width: 0,
    };
  }

  toDTO(business: Product): ProductDto {
    return {
      consumptions: this.consumptionUtils.toDTOS(business.consumptions),
      height: business.height,
      product_id: business.id,
      materials: business.materials,
      price: business.price,
      title: business.title,
      thickness: business.thickness,
      treatment: business.treatment,
      type: business.type,
      width: business.width,
    };
  }

  public getDataTableConfig(
    products: Product[],
    isAdmin: boolean
  ): DataTableConfig {
    let actions: CellActionDefinition[] = [
      {
        icon: 'fa-solid fa-eye',
        action: ProductAction.DETAIL,
      },
    ];
    if (isAdmin) {
      actions.push({
        icon: 'fa-solid fa-pencil',
        action: ProductAction.EDIT,
      });
      actions.push({
        icon: 'fa-solid fa-trash',
        action: ProductAction.DELETE,
      });
    }
    return {
      translateKey: 'admin-feature-product.table.label.',
      data: products,
      cellDefinitions: [
        {
          targetData: ProductKey.TITLE,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false,
        },
        {
          targetData: ProductKey.WIDTH,
          minimalWidthVisibility: MinimalVisibilityWidth.LARGE,
          isMinimalWidth: false,
        },
        {
          targetData: ProductKey.HEIGHT,
          minimalWidthVisibility: MinimalVisibilityWidth.LARGE,
          isMinimalWidth: false,
        },
        {
          targetData: ProductKey.THICKNESS,
          minimalWidthVisibility: MinimalVisibilityWidth.LARGE,
          isMinimalWidth: false,
        },
        {
          targetData: ProductKey.PRICE,
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

  public getDataFormConfig(product: Product,stocks: Stock[]): FormConfig {
    const fields = Object.values(ProductKeyForm);

    const validatorsConfig: FormValidatorsConfig[] = fields.map(field => {
      let fieldValidators = [];

      switch (field) {
        case ProductKeyForm.TITLE:
          fieldValidators.push(Validators.required, Validators.minLength(3));
          break;
        case ProductKeyForm.PRICE:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case ProductKeyForm.WIDTH:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case ProductKeyForm.HEIGHT:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case ProductKeyForm.THICKNESS:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case ProductKeyForm.TREATMENT:
          fieldValidators.push();
          break;
        case ProductKeyForm.MATERIALS:
          fieldValidators.push();
          break;
        case ProductKeyForm.TYPE:
          fieldValidators.push(Validators.required);
          break;
        default:
          // Add default validators if needed
          break;
      }

      return {field, validators: fieldValidators};
    });

    const fieldTypesConfig: FieldTypeConfig[] = fields.map(field => {
      let fieldType = 'text';
      let fieldOptions: FieldSelectOption[] = [];

      if (field === ProductKeyForm.TYPE) {
        fieldType = 'select';
        fieldOptions = Object.values(ProductType).map(
          o => ({
            selected: product.type === o,
            value: o,
            label: `feature.product.type.${o.toLowerCase()}`
          })
        );
      } else if(field === ProductKeyForm.SHELVE){
        fieldType = 'select';
        fieldOptions = flatten(stocks.map(s => s.shelves)).map(
          o => ({
            selected:false,
            value: o,
            label: `${o.rack} ${o.floor}`
          })
        );
      }

      return {field, type: fieldType, options: fieldOptions};
    });

    return {
      data: product,
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig
    };

    /*
    Si on se contente juste de Validator.required tous les champs:

    const fields = Object.keys(product);
    const validatorsConfig: FormValidatorsConfig[] = fields.map(field => ({
      field,
      validators: [Validators.required]
    }));

    return {
      data: product,
      fields,
      validators: validatorsConfig
    };

    */
  }
}
