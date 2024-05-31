import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {map, Observable, tap} from 'rxjs';
import {Shelve} from '../data';
import { StockUtilsService } from './stock-utils.service';
import { ShelveUtilsService } from './shelve-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ShelveService {
  private readonly api: ApiService = inject(ApiService);
  public list$: WritableSignal<Shelve[]> = signal([]);
  private shelveUtilsService: ShelveUtilsService = inject(ShelveUtilsService);


  list(): void {
    this.api.get(ApiURI.SHELVE_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {

        } else {

        }
      })).subscribe();
  }

  detail(id: string): Observable<Shelve> {
    return this.api.get(`${ApiURI.SHELVE_DETAIL}${id}`)
      .pipe(map((response: ApiResponse) => {
        if (response.result) {
          return this.shelveUtilsService.fromDTO(response.data);
        }
        return this.shelveUtilsService.getEmpty()

      }))
  }
}
