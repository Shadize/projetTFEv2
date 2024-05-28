import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {
  Product,
  ProductAction,
  ProductCreatePayload,
  ProductDto, ProductForm,
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
import {ShelveDto, ShelveUtilsService, Stock, StockDto} from '@shelve-feature';
import {flatten} from 'lodash';
import {ProductUpdatePayload} from '../data/payload/product-update.payload';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProductUtilsService implements BusinessUtils<Product, ProductDto> {
  private translateService: TranslateService = inject(TranslateService);
  private consumptionUtils: ConsumptionUtilsService = inject(
    ConsumptionUtilsService
  );

  fromDTO(dto: ProductDto): Product {
    return {
      consumptions: dto.consumptions? this.consumptionUtils.fromDTOS(dto.consumptions) : [],
      height: dto.height,
      id: dto.product_id,
      isEmpty: false,
      materials: dto.materials,
      price: dto.price,
      title: dto.title,
      quantity: dto.quantity,
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

  public toDTOS(business: Product[]): ProductDto[] {
    return business.map((d) => this.toDTO(d));
  }
  public toForm(business:Product,shelve_id:string):ProductForm{
    return {
      height: business.height,
      id: business.id,
      materials: business.materials,
      price: business.height,
      quantity: business.quantity,
      shelve:shelve_id,
      thickness: business.thickness,
      title: business.title,
      treatment: business.treatment,
      type: business.type,
      width: business.width

    }
  }
  public getEmpty(): Product {
    return {
      consumptions: [],
      height: 0,
      id: '',
      title: '',
      isEmpty: true,
      materials: '',
      price: 0,
      quantity: 0,
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
      quantity: business.quantity,
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

  public getDataFormConfig(product: Product, stocks: StockDto[], emptyShelve: ShelveDto, isUpdate: boolean = false): FormConfig {
    const fields = Object.values(ProductKeyForm);

    const validatorsConfig: FormValidatorsConfig[] = fields.map(field => {
      let fieldValidators = [];

      switch (field) {
        case ProductKeyForm.TITLE:
          fieldValidators.push(Validators.required, Validators.minLength(3));
          break;
        case ProductKeyForm.QUNATITY:
          fieldValidators.push(Validators.required, Validators.min(1));
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
        case ProductKeyForm.SHELVE:
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
      } else if (field === ProductKeyForm.SHELVE) {
        fieldType = 'select';
        fieldOptions = flatten(stocks?.map(s => s.shelves)).map(
          o => ({
            selected: false,
            value: o.shelve_id,
            label: this.translateService.instant('feature.product.rack-title', o)
          })
        );
      }

      return {field, type: fieldType, options: fieldOptions};
    });
    let shelve: ShelveDto = emptyShelve;
    if (isUpdate && stocks) {
      const shelves = flatten(stocks
        .map(s => s.shelves));
      shelve = shelves.find(s => s.products.filter(p => p.product_id === product.id).length > 0) || emptyShelve;
    }
    return {
      data: {...this.toForm(product, shelve.shelve_id)},
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig
    };
  }


  public genCreatePayload(product: ProductForm, stocks: StockDto[], shelveId:string): ProductCreatePayload {
    return {
      materials: product.materials,
      treatment: product.treatment,
      thickness: product.thickness,
      title: product.title,
      quantity: product.quantity,
      width: product.width,
      height: product.height,
      price: product.price,
      type: product.type,
      shelve : this.getShelve(stocks, shelveId)
    }
  }

  public genUpdatePayload(product: ProductForm, stocks: StockDto[], shelveId:string): ProductUpdatePayload {
    return {
      ...this.genCreatePayload(product, stocks, shelveId),
      product_id: product.id
    }
  }

  private getShelve(stocks:StockDto[],shelveId:string):ShelveDto{
      const shelves = flatten(stocks.map(s => s.shelves));
      return shelves.find(s => s.shelve_id === shelveId)!;
  }
}
