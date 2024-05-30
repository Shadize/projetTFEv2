import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Consumption, ConsumptionCreatePayload } from '../data';
import { ConsumptionUtilsService } from './consumption-utils.service';
import { Router } from '@angular/router';
import { ApiService, ApiURI, ApiResponse } from '@api';
import { AppNode } from '@shared';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  private readonly router: Router = inject(Router);
  private readonly api: ApiService = inject(ApiService);
  public list$: WritableSignal<Consumption[]> = signal([]);
  private consumptionsUtilsService: ConsumptionUtilsService = inject(ConsumptionUtilsService);

  create(payload: ConsumptionCreatePayload): Observable<Consumption> {
    return this.api.post(ApiURI.MEMBER_CREATE, payload, true).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
        }
      }),
      map((response: ApiResponse) => response.result ? this.consumptionsUtilsService.fromDTO(response.data) : this.consumptionsUtilsService.getEmpty())

    );
  }

  public list(): void {
    this.api.get(ApiURI.CONSUMPTION_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list$.set(this.consumptionsUtilsService.fromDTOS(response.data));
        } else {
          this.list$.set([])
        }
      })).subscribe();
  }

  public listByShelve(id: string): void {
    this.api.get(`${ApiURI.CONSUMPTION_LIST_BY_SHELVE}${id}`)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list$.set(this.consumptionsUtilsService.fromDTOS(response.data));
        } else {
          this.list$.set([])
        }
      })).subscribe();
  }

  delete(id: string) {
    this.api.delete(`${ApiURI.CONSUMPTION_DELETE}${id}`, true)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list();
        }
      })).subscribe();
  }
  
}
