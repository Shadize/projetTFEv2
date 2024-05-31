import { Component, Signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AppRoutes,
  CardComponent,
  CardHeaderComponent,
  CellActionDefinition,
  DataTableComponent,
  DataTableConfig
} from '@shared';
import { Stock, StockAction } from '../../data';
import { StockService, StockUtilsService } from '../../service';
import { ProductService } from 'app/dashboard/feature/product/service';
import { ProductListPageComponent } from 'app/dashboard/feature/product/page';

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


  ngOnInit(): void {
    this.productService.list();
    this.stockService.list();
  }


  public onActionClicked(data: CellActionDefinition): void {
    const item: Stock = data.data! as Stock;
    switch (data.action) {
      case StockAction.DETAIL:
        this.handleDetail(item.id);
        break;
    }
  }

  public onStockRowClicked(data: any): void {
    this.router.navigate([AppRoutes.STOCK_DETAIL.replace(':id',data.id)]).then();

  }



  private genStockConfigs(stocks: Stock[] | undefined): DataTableConfig {

    return this.stockUtils.getDataTableConfig(stocks ?? [], false);
  }


  private handleDetail(id:string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_DETAIL.replace(':id',id)]).then();
  }


}
