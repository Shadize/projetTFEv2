import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableConfig, AppRoutes, CardHeaderComponent, DataTableComponent, CardComponent, CardActionDefinition, CellActionDefinition, confirmDialog } from '@shared';
import { Product, ProductAction } from '../../data';
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
  protected actions$: WritableSignal<CardActionDefinition[]> = signal(this.getAction());



  ngOnInit(): void {
    this.productService.list();
  }


  public onProductRowClicked(data: any): void {
    this.router.navigate([AppRoutes.PRODUCT_DETAIL.replace(':id',data.id)]).then();

  }

  private genProductConfigs(products: Product[] | undefined): DataTableConfig {

    return this.productUtils.getDataTableConfig(products ?? [], true, true);
  }

  public actioncCliked(data: CardActionDefinition): void {
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

  private handleEdit(id : string): void {
    this.router.navigate([AppRoutes.ADMIN_PRODUCT_UPDATE.replace(':id',id)]).then();

  }

  @confirmDialog({
    title: 'admin-feature-product-delete.confirm-title',
    message: 'admin-feature-product-delete.confirm-message'
  })
  private handleDelete(id: string): void {
    this.productService.delete(id);  }
  
  private getAction(): CardActionDefinition[] {
    return [
      {
        icon: 'fa-plus',
        action: ProductAction.CREATE
      }
    ]
  }
}
