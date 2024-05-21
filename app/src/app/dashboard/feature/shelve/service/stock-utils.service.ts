import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Stock, StockDto} from '@shelve-feature';
import {ShelveUtilsService} from './shelve-utils.service';
import {DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {StockKey} from '../data/enum/stock-key.enum';

@Injectable({
  providedIn: 'root'
})
export class StockUtilsService implements BusinessUtils<Stock, StockDto> {
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);

  public fromDTO(dto: StockDto): Stock {
    return {
      id: dto.stock_id,
      isEmpty: false,
      section: dto.section,
      shelves: this.shelveUtils.fromDTOS(dto.shelves),
      title: dto.title,
      str: dto.title
    }
  }

  public fromDTOS(dtos: StockDto[]): Stock[] {
    return dtos.map(d => this.fromDTO(d));
  }

  public getEmpty(): Stock {
    return {
      id: '',
      isEmpty: true,
      title: '',
      section: Section.WOOD,
      shelves: [],
      str: 'api.common.empty'

    }
  }

  public toDTO(business: Stock): StockDto {
    return {
      stock_id: business.id,
      section: business.section,
      shelves: this.shelveUtils.toDTOS(business.shelves),
      title: business.title
    }
  }

  public getDataTableConfig(stocks: Stock[], b: boolean): DataTableConfig {
    return {
      translateKey: 'admin-feature-shelve.table.label.',
      data:stocks,
      cellDefinitions:[
        {
          targetData:StockKey.TITLE,
          minimalWidthVisibility:MinimalVisibilityWidth.SMALL
        }
      ]
    }
  }
}
