import { ProductUtilsService } from 'app/dashboard/feature/product/service';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService, ApiURI, ApiResponse } from '@api';
import { tap } from 'rxjs';
import { Product } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly api: ApiService = inject(ApiService);
  public list$: WritableSignal<Product[]> = signal([]);
  private productUtilsService: ProductUtilsService = inject(ProductUtilsService);

  list(): void {
    this.api.get(ApiURI.PRODUCT_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list$.set(this.productUtilsService.fromDTOS(response.data));
        } else {
          this.list$.set([])
        }
      })).subscribe();
  }
}
