import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Stock} from '@shelve-feature';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {tap} from 'rxjs';
import {StockUtilsService} from './stock-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public list$: WritableSignal<Stock[]> = signal([]);
  private api: ApiService = inject(ApiService);
  private stockUtilsService: StockUtilsService = inject(StockUtilsService);

  public list(): void {
    this.api.get(ApiURI.STOCK_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list$.set(this.stockUtilsService.fromDTOS(response.data));
        } else {
          this.list$.set([])
        }
      })).subscribe();
  }
}
