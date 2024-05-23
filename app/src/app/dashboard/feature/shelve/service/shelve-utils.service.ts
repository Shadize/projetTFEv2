import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Shelve, ShelveDto} from '@shelve-feature';
import {ProductUtilsService} from '../../product/service';
import {Product} from '@product-feature';
import {DataTableConfig, FormControlSimpleConfig, MinimalVisibilityWidth} from '@shared';

@Injectable({
  providedIn: 'root'
})
export class ShelveUtilsService implements BusinessUtils<Shelve, ShelveDto> {
  private productUtilsService: ProductUtilsService = inject(ProductUtilsService);

  fromDTO(dto: ShelveDto): Shelve {
    const product: Product | undefined = dto.product ? this.productUtilsService.fromDTO(dto.product) : undefined
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
      product,
      rack: dto.rack,
      section: dto.section,
      str: product?.title || 'app.common.empty'
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
      section: Section.WOOD,
      str: 'api.common.empty'

    }
  }

  toDTO(business: Shelve): ShelveDto {
    return {

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
      product: business.product ? this.productUtilsService.toDTO(business.product) : undefined,
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

  public getCreateFormConfig(): FormControlSimpleConfig[] {
    return []
  }
}
