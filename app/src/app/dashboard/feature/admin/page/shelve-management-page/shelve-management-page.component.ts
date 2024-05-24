import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {AppRoutes, CellActionDefinition, confirmDialog, DataTableComponent, DataTableConfig} from '@shared';
import {Stock, StockAction, StockService, StockUtilsService} from '@shelve-feature';
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
    const item: Stock = data.data! as Stock;
    switch (data.action) {
      case StockAction.DETAIL:
        this.handleDetail(item.id);
        break;
      case StockAction.EDIT:
        this.handleEdit(item.id);
        break;
      case StockAction.DELETE:
        this.handleDelete(item.id);
        break;

    }
  }

  public onRowClicked(data: any): void {
    console.log('onRowClicked', data);
  }

  private genConfigs(stocks: Stock[]): DataTableConfig {
    return this.stockUtils.getDataTableConfig(stocks, true);
  }

  private handleDetail(id:string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_DETAIL.replace(':id',id)]).then();
  }

  private handleEdit(id: string): void {
    this.router.navigate([AppRoutes.ADMIN_SHELVE_UPDATE.replace(':id', id)]).then();
  }
  @confirmDialog({
    title: 'admin-feature-shelve-delete.confirm-title',
    message: 'admin-feature-shelve-delete.confirm-message'
  })
  private handleDelete(id:string): void {
    this.stockService.delete(id);
  }
}
