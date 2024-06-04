import {Component, computed, inject, Input, OnInit, Signal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockService} from '@shelve-feature';
import {
  AppRoutes,
  CardComponent,
  CardHeaderComponent,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent
} from '@shared';
import {flatten} from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stock-shelve-detail',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    DataTableComponent,
    DetailNotFoundComponent
  ],
  templateUrl: './stock-shelve-detail.component.html',
  styleUrl: './stock-shelve-detail.component.scss'
})
export class StockShelveDetailComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  protected router: Router = inject(Router);
  public list$: Signal<Shelve[]> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public shelveDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConfig(this.list$()));


  ngOnInit() {
    this.stockService.detail(this.id);
  }

  genConfig(shelves: Shelve[]): DataTableConfig {
    return this.shelveUtils.getDataTableConfig(shelves);
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve[] {
    if (stocks) {
      const shelves = flatten(stocks.map(s => s.shelves));
      const detail = shelves.find(s => s.id === this.id);
      return detail ? shelves.filter(s => s.locationReference === detail.locationReference) : [];
    }
    this.stockService.list();
    return [this.shelveUtils.getEmpty()];

  }

  goToDetail(data: any): void {
    this.router.navigate([AppRoutes.SHELVE_DETAIL.replace(':id', data.id)]);
  }
}

