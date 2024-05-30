import { ProductUtilsService } from 'app/dashboard/feature/product/service';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { ApiService, ApiURI, ApiResponse } from '@api';
import { Observable, map, tap } from 'rxjs';
import { Product, ProductCreatePayload } from '../data';
import { ProductUpdatePayload } from '../data/payload/product-update.payload';
import { AppNode } from '@shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly router: Router = inject(Router);
  private readonly api: ApiService = inject(ApiService);
  public list$: WritableSignal<Product[]> = signal([]);
  private productUtilsService: ProductUtilsService = inject(ProductUtilsService);

  public list(): void {
    this.api.get(ApiURI.PRODUCT_LIST)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list$.set(this.productUtilsService.fromDTOS(response.data));
        } else {
          this.list$.set([])
        }
      })).subscribe();
  }


  detail(id: string): Observable<Product> {
    return this.api.get(`${ApiURI.PRODUCT_DETAIL}${id}`)
      .pipe(map((response: ApiResponse) => {
        if (response.result) {
          return this.productUtilsService.fromDTO(response.data);
        }
        return this.productUtilsService.getEmpty()

      }))
  }

  public create(payload: ProductCreatePayload): Observable<Product> {
    return this.api.post(ApiURI.PRODUCT_CREATE, payload, true).pipe(
      tap((response: ApiResponse) => {
        if (response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_PRODUCT_LIST]).then();
        }
      }),
      map((response: ApiResponse) => response.result ? this.productUtilsService.fromDTO(response.data) : this.productUtilsService.getEmpty())

    );

  }

  public update(payload: ProductUpdatePayload, needRedirect=true): Observable<Product> {
    return this.api.put(ApiURI.PRODUCT_UPDATE, payload,true).pipe(
      tap((response: ApiResponse) => {
        if (needRedirect && response.result) {
          this.router.navigate([AppNode.REDIRECT_TO_PRODUCT_LIST]).then();
        }
      }),
      map((response: ApiResponse) => response.result ? this.productUtilsService.fromDTO(response.data) : this.productUtilsService.getEmpty())
    );
  }

  delete(id: string) {
    this.api.delete(`${ApiURI.PRODUCT_DELETE}${id}`, true)
      .pipe(tap((response: ApiResponse) => {
        if (response.result) {
          this.list();
        }
      })).subscribe();
  }
}
