import { Component, Signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {AppRoutes, CardComponent, CellActionDefinition, DataTableComponent, DataTableConfig} from '@shared';
import { Stock, StockAction } from '../../data';
import { StockService, StockUtilsService } from '../../service';

@Component({
  selector: 'app-shelve-list-page',
  standalone: true,
  imports: [
    DataTableComponent,
    TranslateModule,
    CardComponent
  ],
  templateUrl: './shelve-list-page.component.html',
  styleUrl: './shelve-list-page.component.scss'
})
export class ShelveListPageComponent {
  private router: Router = inject(Router);
  private stockService: StockService = inject(StockService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  protected config$: Signal<DataTableConfig> = computed(() => this.genConfigs(this.stockService.list$()));

  ngOnInit(): void {
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

  public onRowClicked(data: any): void {
    this.router.navigate([AppRoutes.STOCK_DETAIL.replace(':id',data.id)]).then();

  }

  private genConfigs(stocks: Stock[] | undefined): DataTableConfig {

    return this.stockUtils.getDataTableConfig(stocks ?? [], false);
  }

  private handleDetail(id:string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_DETAIL.replace(':id',id)]).then();
  }


}
