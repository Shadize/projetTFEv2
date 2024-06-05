import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Shelve, ShelveDto, Stock} from '@shelve-feature';
import {ProductUtilsService} from '../../product/service';
import {Product} from '@product-feature';
import {DataTableConfig, FormControlSimpleConfig, MinimalVisibilityWidth} from '@shared';
import {TranslateService} from '@ngx-translate/core';
import {flatten} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ShelveUtilsService implements BusinessUtils<Shelve, ShelveDto> {
  private productUtilsService: ProductUtilsService = inject(ProductUtilsService);
  private translateService: TranslateService = inject(TranslateService);

  fromDTO(dto: ShelveDto): Shelve {
    return {
      background: dto.background,
      color: dto.color,
      endX: dto.endX,
      endY: dto.endY,
      height: dto.height,
      left: dto.left,
      startX: dto.startX,
      startY: dto.startY,
      top: dto.top,
      width: dto.width,
      floor: dto.floor,
      id: dto.shelve_id,
      isEmpty: false,
      location: dto.location,
      nbItemsMax: dto.nb_items_max,
      products: this.productUtilsService.fromDTOS(dto.products),
      rack: dto.rack,
      section: dto.section,
      str: this.translateService.instant('feature.product.rack-title', dto),
      productName: dto.products.length > 0 ? dto.products[0].title : 'app.common.empty',
      productQuantity: dto.products.length > 0 ? dto.products.map(p => p.quantity).reduce((sum, current) => sum + current).toString() : 'shelve.no-product',
      locationReference: dto.location_reference
    }
  }

  fromDTOS(dtos: ShelveDto[]): Shelve[] {
    return dtos.map(d => this.fromDTO(d));
  }

  toDTOS(business: Shelve[]): ShelveDto[] {
    return business.map(b => this.toDTO(b));
  }

  getEmpty(): Shelve {
    return {
      background: '', color: '', endX: 0, endY: 0, height: '', left: '', startX: 0, startY: 0, top: '', width: '',
      floor: '',
      id: '',
      isEmpty: true,
      location: '',
      nbItemsMax: 0,
      rack: '',
      products: [],
      section: Section.WOOD,
      str: 'api.common.empty',
      productName: 'shelve.no-product',
      productQuantity: 'shelve.no-product',
      locationReference: ''

    }
  }

  toDTO(business: Shelve): ShelveDto {
    return {
      location_reference: business.locationReference,
      background: business.background,
      color: business.color,
      endX: business.endX,
      endY: business.endY,
      height: business.height,
      left: business.left,
      startX: business.startX,
      startY: business.startY,
      top: business.top,
      width: business.width,
      floor: business.floor,
      shelve_id: business.id,
      location: business.location,
      nb_items_max: business.nbItemsMax,
      products: this.productUtilsService.toDTOS(business.products),
      rack: business.rack,
      section: business.section,
    }
  }

  getAdminDataTableConfig(data: Shelve[]): DataTableConfig {
    return {
      data,
      translateKey: 'admin-feature-shelve.table.label.',
      cellDefinitions: [
        {
          targetData: 'rack',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: 'floor',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        }
      ],
    }
  }

  getDataTableConfig(data: Shelve[]): DataTableConfig {
    return {
      data,
      translateKey: 'admin-feature-shelve.table.label.',
      cellDefinitions: [
        {
          targetData: 'rack',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: 'floor',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: 'productName',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: 'productQuantity',
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        }
      ],
    }
  }

  public getCreateFormConfig(): FormControlSimpleConfig[] {
    return []
  }

  getShelveForProduct(stocks: Stock[], product: Product | null) {
    if (!product) {
      return this.getEmpty();
    }
    const shelve = flatten(stocks.map(s => s.shelves))
      .find(s => s.products.filter(p => p.id === product.id).length > 0) ?? this.getEmpty();
    if (shelve.isEmpty) {
      return shelve;
    }
    const stock = stocks.find(s => s.shelves.filter(sh => sh.id === shelve.id));
    console.log(stock);
    if(stock){
      return {
        ...shelve,
        str: `${stock.str} ${shelve.str}`
      }
    }
    return shelve;
  }
  getShelveDetailFromStock(stocks: Stock[],id:string):Shelve {
    if (!stocks) {
      return this.getEmpty();
    }
    const shelve = flatten(stocks.map(s => s.shelves)).find(s => s.id === id) ?? this.getEmpty();
    if (shelve.isEmpty) {
      return shelve;
    }
    const stock = stocks.find(s => s.shelves.filter(sh => sh.id === shelve.id));
    if(stock){
      return {
        ...shelve,
        str: `${stock.str} ${shelve.str}`
      }
    }
    return shelve;
  }
}
