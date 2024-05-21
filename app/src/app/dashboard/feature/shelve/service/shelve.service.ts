import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {ApiResponse, ApiService, ApiURI} from '@api';
import {tap} from 'rxjs';
import {Stock} from '../data';

@Injectable({
  providedIn: 'root'
})
export class ShelveService {
  private readonly api: ApiService = inject(ApiService);
  public list$: WritableSignal<Stock[]> = signal([]);

  list(): void {
    this.api.get(ApiURI.SHELVE_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {

        } else {

        }
      })).subscribe();
  }
}
