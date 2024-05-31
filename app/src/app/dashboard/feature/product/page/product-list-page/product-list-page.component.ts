import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableConfig, AppRoutes, CardHeaderComponent, DataTableComponent, CardComponent } from '@shared';
import { Product } from '../../data';
import { ProductService, ProductUtilsService } from '../../service';

@Component({
    selector: 'app-product-list-page',
    standalone: true,
    templateUrl: './product-list-page.component.html',
    styleUrl: './product-list-page.component.scss',
    imports: [CardHeaderComponent, DataTableComponent, CardComponent]
})
export class ProductListPageComponent implements OnInit {

  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected productConfig$: Signal<DataTableConfig> = computed(() => this.genProductConfigs(this.productService.list$()));



  ngOnInit(): void {
    this.productService.list();
  }


  public onProductRowClicked(data: any): void {
    this.router.navigate([AppRoutes.PRODUCT_DETAIL.replace(':id',data.id)]).then();

  }

  private genProductConfigs(products: Product[] | undefined): DataTableConfig {

    return this.productUtils.getDataTableConfig(products ?? [], false, false);
  }
}
