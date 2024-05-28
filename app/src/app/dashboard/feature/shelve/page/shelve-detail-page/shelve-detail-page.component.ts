import {Component, computed, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockDetailComponent, StockService} from '@shelve-feature';
import {tap} from 'rxjs';
import {
  CardComponent,
  CardHeaderComponent,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent
} from '@shared';
import {flatten} from 'lodash';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {SIGNAL} from '@angular/core/primitives/signals';

@Component({
  selector: 'app-shelve-detail-page',
  standalone: true,
  imports: [
    StockDetailComponent,
    CardComponent,
    CardHeaderComponent,
    TranslateModule,
    DetailNotFoundComponent,
    JsonPipe,
    DataTableComponent
  ],
  templateUrl: './shelve-detail-page.component.html',
  styleUrl: './shelve-detail-page.component.scss'
})
export class ShelveDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public list$: Signal<Shelve[]> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public shelveDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConfig(this.list$()));


  ngOnInit() {
  }

  genConfig(shelves: Shelve[]): DataTableConfig {
    return this.shelveUtils.getDataTableConfig(shelves);
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve[] {
    if (stocks) {
      const shelves = flatten(stocks.map(s => s.shelves));
      const detail = shelves.find(s => s.id === this.id) ?? this.shelveUtils.getEmpty();
      console.log('detail', detail);
    }
    this.stockService.list();
    return [this.shelveUtils.getEmpty()];

  }
}
