import {inject, Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {Product, ProductDto, ProductType} from '@product-feature';
import {ConsumptionUtilsService} from '@consumption-feature';

@Injectable({
  providedIn: 'root'
})
export class ProductUtilsService implements BusinessUtils<Product, ProductDto> {
  private consumptionUtils: ConsumptionUtilsService = inject(ConsumptionUtilsService)

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
      width: dto.width
    }
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
      width: 0

    }
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
      width: business.width
    }
  }
}
