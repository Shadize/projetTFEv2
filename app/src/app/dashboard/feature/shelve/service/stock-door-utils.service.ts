import {Injectable} from '@angular/core';
import {BusinessUtils} from '@core';
import {StockDoor, StockDoorPosition, StockDoorType} from '@shelve-feature';
import {StockDoorDto} from '../data/dto/stock-door.dto';

@Injectable({
  providedIn: 'root'
})
export class StockDoorUtilsService implements BusinessUtils<StockDoor, StockDoorDto> {
  fromDTO(dto: StockDoorDto): StockDoor {
    return {
      endX: dto.endX,
      endY: dto.endY,
      id: dto.stock_door_id,
      isEmpty: false,
      startX: dto.startX,
      startY: dto.startY,
      str: dto.type,
      style: dto.style,
      type: dto.type,
      wall: dto.wall
    }
  }

  getEmpty(): StockDoor {
    return {
      endX: 0,
      endY: 0,
      id: '',
      isEmpty: false,
      startX: 0,
      startY: 0,
      str: '',
      style: '',
      type: StockDoorType.HORIZONTAL,
      wall: StockDoorPosition.RIGHT

    }
  }

  toDTOS(business: StockDoor[]): StockDoorDto [] {
    return business.map(i => this.toDTO(i));
  }
  fromDTOS(dto: StockDoorDto[]): StockDoor [] {
    return dto.map(i => this.fromDTO(i));
  }

  toDTO(business: StockDoor): StockDoorDto {
    return {
      endX: business.endX,
      endY: business.endY,
      stock_door_id: business.id,
      startX: business.startX,
      startY: business.startY,
      style: business.style,
      type: business.type,
      wall: business.wall
    }
  }

}
