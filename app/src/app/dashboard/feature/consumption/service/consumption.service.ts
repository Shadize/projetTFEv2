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
}
