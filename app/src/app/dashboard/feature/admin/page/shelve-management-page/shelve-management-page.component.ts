import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {AppRoutes, CellActionDefinition, DataTableComponent, DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {StockService, StockUtilsService} from '../../../shelve/service';
import {Stock} from '@shelve-feature';
import {StockAction} from '../../../shelve/data/enum';
import {TranslateModule} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shelve-management-page',
  standalone: true,
  imports: [
    DataTableComponent,
    TranslateModule
  ],
  templateUrl: './shelve-management-page.component.html',
  styleUrl: './shelve-management-page.component.scss'
})
export class ShelveManagementPageComponent implements OnInit {
  private router: Router = inject(Router);
  private stockService: StockService = inject(StockService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  protected config$: Signal<DataTableConfig> = computed(() => this.genConfigs(this.stockService.list$()));

  ngOnInit(): void {
    this.stockService.list();
  }

  public addItem(): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_CREATE]).then();
  }

  public onActionClicked(data: CellActionDefinition): void {
    switch (data.action) {
      case StockAction.DETAIL:
        this.handleDetail();
        break;
      case StockAction.EDIT:
        this.handleEdit();
        break;
      case StockAction.DELETE:
        this.handleDelete();
        break;

    }
  }

  public onRowClicked(data: any): void {
    console.log('onRowClicked', data);
  }

  private genConfigs(stocks: Stock[]): DataTableConfig {
    return this.stockUtils.getDataTableConfig(stocks, true);
  }

  private handleDetail(): void {
    console.log('show detail');
  }

  private handleEdit(): void {
    console.log('edit item');
  }

  private handleDelete(): void {
    console.log('handle delete');
  }
}
