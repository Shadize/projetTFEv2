import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Stock, StockCreatePayload, StockUpdatePayload} from '@shelve-feature';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {map, Observable, tap} from 'rxjs';
import {StockUtilsService} from './stock-utils.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public list$: WritableSignal<Stock[]| undefined> = signal(undefined);
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

  public create(payload: StockCreatePayload): Observable<Stock> {
    return this.api.post(ApiURI.STOCK_CREATE, payload, true).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.list();
        }
      }),
      map((response: ApiResponse) => response.result ? this.stockUtilsService.fromDTO(response.data) : this.stockUtilsService.getEmpty())
    );
  }

  public update(payload: StockUpdatePayload): Observable<Stock> {
    console.log('payload', payload);
    return this.api.put(ApiURI.STOCK_UPDATE, payload, true).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.list();
        }
      }),
      map((response: ApiResponse) => response.result ? this.stockUtilsService.fromDTO(response.data) : this.stockUtilsService.getEmpty())
    );
  }


  detail(id: string): Observable<Stock> {
    return this.api.get(`${ApiURI.STOCK_DETAIL}${id}`)
      .pipe(map((response: ApiResponse) => {
        if (response.result) {
          return this.stockUtilsService.fromDTO(response.data);
        }
        return this.stockUtilsService.getEmpty()

      }))
  }

  delete(id: string) {
    this.api.delete(`${ApiURI.STOCK_DELETE}${id}`, true)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list();
        }
      })).subscribe();
  }
}
