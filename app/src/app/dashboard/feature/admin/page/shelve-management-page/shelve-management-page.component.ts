import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {DataTableComponent, DataTableConfig, MinimalVisibilityWidth} from '@shared';
import {StockService, StockUtilsService} from '../../../shelve/service';
import {Stock} from '@shelve-feature';

@Component({
  selector: 'app-shelve-management-page',
  standalone: true,
  imports: [
    DataTableComponent
  ],
  templateUrl: './shelve-management-page.component.html',
  styleUrl: './shelve-management-page.component.scss'
})
export class ShelveManagementPageComponent implements OnInit {
  private stockService: StockService = inject(StockService);
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  protected config$:Signal<DataTableConfig> = computed(()=> this.genConfigs(this.stockService.list$()));

  ngOnInit(): void {
    this.stockService.list();
  }

  private genConfigs(stocks: Stock[]):DataTableConfig {
    return this.stockUtils.getDataTableConfig(stocks, true);
  }
}
