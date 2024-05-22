import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Shelve, ShelveDto, Stock, StockCreatePayload, StockDto} from '@shelve-feature';
import {ShelveUtilsService} from './shelve-utils.service';
import {CellActionDefinition, DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {StockAction, StockKey} from '../data/enum';
import {flatten} from 'lodash';

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
      str: dto.title,
      height: dto.height,
      scale: dto.scale,
      width: dto.width,
    }
  }

  public fromDTOS(dtos: StockDto[]): Stock[] {
    return dtos.map(d => this.fromDTO(d));
  }

  public getEmpty(): Stock {
    return {
      height: 0, scale: 0, width: 0,
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
      title: business.title,

      height: business.height,
      scale: business.scale,
      width: business.width,
    }
  }

  public getDataTableConfig(stocks: Stock[], isAdmin: boolean): DataTableConfig {
    let actions: CellActionDefinition[] = [
      {
        icon: 'fa-solid fa-eye',
        action: StockAction.DETAIL
      }
    ]
    if (isAdmin) {
      actions.push({
        icon: 'fa-solid fa-pencil',
        action: StockAction.EDIT
      });
      actions.push({
        icon: 'fa-solid fa-trash',
        action: StockAction.DELETE
      });
    }
    return {
      translateKey: 'admin-feature-shelve.table.label.',
      data: stocks,
      cellDefinitions: [
        {
          targetData: StockKey.TITLE,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: StockKey.TITLE,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false
        },
        {
          targetData: '',
          actions,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: true
        }
      ]
    }
  }

  genCreatePayload(stock: Stock): StockCreatePayload {
    return {
      title:stock.title,
      width:stock.width,
      height:stock.height,
      scale:stock.scale!,
      shelves: flatten(stock.shelves.map((shelve:Shelve)=>(
        [...Array(shelve.floor).keys()].map((key)=>({
          ...this.shelveUtils.toDTO(shelve),
          floor:key.toString()
        }))
      )))
    }
  }
}
