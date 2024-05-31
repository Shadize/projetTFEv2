import {inject, Injectable} from '@angular/core';
import {BusinessUtils, Section} from '@core';
import {Stock, StockCreatePayload, StockDto, StockUpdatePayload} from '@shelve-feature';
import {ShelveUtilsService} from './shelve-utils.service';
import {CellActionDefinition, DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {StockAction, StockKey} from '../data';
import {StockDoorUtilsService} from './stock-door-utils.service';
import {SecurityService} from '@security';

@Injectable({
  providedIn: 'root'
})
export class StockUtilsService implements BusinessUtils<Stock, StockDto> {
  private securityService: SecurityService = inject(SecurityService);
  private shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  private doorUtilsService: StockDoorUtilsService = inject(StockDoorUtilsService);

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
      doors: this.doorUtilsService.fromDTOS(dto.doors),
    }
  }

  public toDTOS(business: Stock[] | undefined): StockDto[] {
    if (business) {
      return business.map(b => this.toDTO(b));
    }
    return [];
  }

  public fromDTOS(dtos: StockDto[]): Stock[] {
    return dtos.map(d => this.fromDTO(d));
  }

  public getEmpty(): Stock {
    return {
      height: 500, scale: 50, width: 1000,
      id: '',
      isEmpty: true,
      title: 'hangar',
      section: Section.WOOD,
      shelves: [],
      doors: [],
      str: 'api.common.empty'

    }
  }

  public toDTO(business: Stock): StockDto {
    return {
      stock_id: business.id,
      section: business.section,
      shelves: this.shelveUtils.toDTOS(business.shelves),
      title: business.title,
      doors: this.doorUtilsService.toDTOS(business.doors),
      height: business.height,
      scale: business.scale,
      width: business.width,
    }
  }

  public getDataTableConfig(stocks: Stock[]): DataTableConfig {
    let actions: CellActionDefinition[] = []
    if (this.securityService.account$().isAdmin) {
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
          targetData: '',
          actions,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: true,
          specialCss:'action-cell'
        }
      ]
    }
  }

  genCreatePayload(stock: Stock): StockCreatePayload {
    return {
      title: stock.title,
      width: stock.width,
      height: stock.height,
      scale: stock.scale!,
      shelves: this.shelveUtils.toDTOS(stock.shelves),
      doors: this.doorUtilsService.toDTOS(stock.doors)
    }
  }

  genUpdatePayload(stock: Stock): StockUpdatePayload {
    console.log('stock id', stock.id);
    return {
      ...this.genCreatePayload(stock),
      stock_id: stock.id
    }
  }
}
