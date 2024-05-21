import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Shelve, ShelveDto} from '@shelve-feature';
import {ProductUtilsService} from '../../product/service';
import {Product} from '@product-feature';

@Injectable({
  providedIn: 'root'
})
export class ShelveUtilsService implements BusinessUtils<Shelve, ShelveDto> {
  private productUtilsService: ProductUtilsService = inject(ProductUtilsService);

  fromDTO(dto: ShelveDto): Shelve {
    const product: Product | undefined = dto.product ? this.productUtilsService.fromDTO(dto.product) : undefined
    return {
      floor: dto.floor,
      id: dto.shelve_id,
      isEmpty: false,
      location: dto.location,
      nb_items_max: dto.nb_items_max,
      product,
      rack: dto.rack,
      section: dto.section,
      str: product?.title || 'app.common.empty'
    }
  }

  getEmpty(): Shelve {
    return {
      floor: '',
      id: '',
      isEmpty: true,
      location: '',
      nb_items_max: 0,
      rack: '',
      section: Section.WOOD,
      str: 'api.common.empty'

    }
  }

  toDTO(business: Shelve): ShelveDto {
    return {
      floor: business.floor,
      shelve_id: business.id,
      location: business.location,
      nb_items_max: business.nb_items_max,
      product: business.product ? this.productUtilsService.toDTO(business.product) : undefined,
      rack: business.rack,
      section: business.section,
    }
  }
}
