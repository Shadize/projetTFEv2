import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { DataTableConfig, CellActionDefinition, AppRoutes, DataTableComponent, confirmDialog } from '@shared';
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
      case ProductAction.EDIT:
        this.handleEdit(item.id);
        break;
      case ProductAction.DELETE:
        this.handleDelete(item.id);
        break;

    }
  }

  public onRowClicked(data: any): void {
  }


  private genConfigs(products: Product[] | undefined): DataTableConfig {
    return this.productUtils.getDataTableConfig(products!, true);
  }

  private handleEdit(id : string): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT_UPDATE.replace(':id',id)]).then();

  }

  @confirmDialog({
    title: 'admin-feature-product-delete.confirm-title',
    message: 'admin-feature-product-delete.confirm-message'
  })
  private handleDelete(id: string): void {
    this.productService.delete(id);  }
}
