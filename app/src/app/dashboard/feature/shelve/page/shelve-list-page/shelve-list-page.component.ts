import {Component, Signal, computed, inject, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {
  AppRoutes, CardActionDefinition,
  CardComponent,
  CardHeaderComponent,
  CellActionDefinition, confirmDialog,
  DataTableComponent,
  DataTableConfig
} from '@shared';
import {Stock, StockAction} from '../../data';
import {StockService, StockUtilsService} from '../../service';
import {ProductService} from 'app/dashboard/feature/product/service';
import {ProductListPageComponent} from 'app/dashboard/feature/product/page';

enum ShelveListAction {
  ADD = 'ADD'
}

@Component({
  selector: 'app-shelve-list-page',
  standalone: true,
  templateUrl: './shelve-list-page.component.html',
  styleUrl: './shelve-list-page.component.scss',
  imports: [
    DataTableComponent,
    TranslateModule,
    CardComponent,
    CardHeaderComponent,
    ProductListPageComponent
  ]
})
export class ShelveListPageComponent {
  private router: Router = inject(Router);
  private stockService: StockService = inject(StockService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  private productService: ProductService = inject(ProductService);
  protected stockConfig$: Signal<DataTableConfig> = computed(() => this.genStockConfigs(this.stockService.list$()));
  protected actions$: WritableSignal<CardActionDefinition[]> = signal(this.getAction());

  ngOnInit(): void {
    this.productService.list();
    this.stockService.list();
  }


  public onActionClicked(data: CellActionDefinition): void {
    const item: Stock = data.data! as Stock;
    switch (data.action) {
      case StockAction.EDIT:
        this.handleEdit(item.id);
        break;
      case StockAction.DELETE:
        this.handleDelete(item.id);
        break;
    }
  }

  public onStockRowClicked(data: any): void {
    this.router.navigate([AppRoutes.STOCK_DETAIL.replace(':id', data.id)]).then();

  }

  public actioncCliked(data: CardActionDefinition): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_CREATE]).then();
  }

  private genStockConfigs(stocks: Stock[] | undefined): DataTableConfig {

    return this.stockUtils.getDataTableConfig(stocks ?? []);
  }


  private handleDetail(id: string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_DETAIL.replace(':id', id)]).then();
  }

  private handleEdit(id: string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_UPDATE.replace(':id', id)]).then();
  }

  @confirmDialog({
    title: 'common.delete-form.confirm-title',
    message: 'common.delete-form.confirm-message'
  })
  private handleDelete(id: string): void {
    this.stockService.delete(id);
  }

  private getAction(): CardActionDefinition[] {
    return [
      {
        icon: 'fa-plus',
        action: ShelveListAction.ADD,
        isDisabled:false
      }
    ]
  }

}
