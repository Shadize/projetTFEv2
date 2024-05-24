import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { DataTableConfig, CellActionDefinition, AppRoutes, DataTableComponent } from '@shared';
import { Product, ProductAction } from 'app/dashboard/feature/product/data';
import { ProductService, ProductUtilsService } from 'app/dashboard/feature/product/service';
import {TranslateModule} from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-management-page',
    standalone: true,
    templateUrl: './product-management-page.component.html',
    styleUrl: './product-management-page.component.scss',
    imports: [
      DataTableComponent,
      TranslateModule]
})
export class ProductManagementPageComponent implements OnInit {
  private router: Router = inject(Router);
  private productService: ProductService = inject(ProductService);
  private productUtils: ProductUtilsService = inject(ProductUtilsService);
  protected config$: Signal<DataTableConfig> = computed(() => this.genConfigs(this.productService.list$()));


  ngOnInit(): void {
      this.productService.list();
  }


  addItem() {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT_CREATE]).then();
    }


  public onActionClicked(data: CellActionDefinition): void {
    const item : Product = data.data! as Product;
    switch (data.action) {
      case ProductAction.DETAIL:
        this.handleDetail();
        break;
      case ProductAction.EDIT:
        this.handleEdit(item.id);
        break;
      case ProductAction.DELETE:
        this.handleDelete();
        break;

    }
  }

  public onRowClicked(data: any): void {
    console.log('onRowClicked', data);
  }


  private genConfigs(products: Product[]): DataTableConfig {
    return this.productUtils.getDataTableConfig(products, true);
  }


  private handleDetail(): void {
    console.log('show detail');
  }

  private handleEdit(id : string): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT_UPDATE.replace(':id',id)]).then();

  }

  private handleDelete(): void {
    console.log('handle delete');
  }
}
