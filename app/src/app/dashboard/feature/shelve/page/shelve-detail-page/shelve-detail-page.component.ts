import {Component, computed, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockDetailComponent, StockService} from '@shelve-feature';
import {tap} from 'rxjs';
import {
  CardComponent,
  CardHeaderComponent, CellActionDefinition,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent
} from '@shared';
import {flatten} from 'lodash';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {SIGNAL} from '@angular/core/primitives/signals';
import {ProductUtilsService} from '../../../product/service';

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
  protected productUtils: ProductUtilsService = inject(ProductUtilsService);
  public detail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$()));
  public productDataTableConfig: Signal<DataTableConfig> = computed(() => this.genConfig(this.detail$()));
  public isAddingConsumption$: WritableSignal<boolean> = signal(false);

  ngOnInit() {

  }

  genConfig(shelve: Shelve): DataTableConfig {
    return this.productUtils.getShelveDetailDataConfig(shelve.products);
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve {
    if (stocks) {
      const shelves = flatten(stocks.map(s => s.shelves));
      return shelves.find(s => s.id === this.id) ?? this.shelveUtils.getEmpty();
    }
    this.stockService.list();
    return this.shelveUtils.getEmpty();

  }

  public consume(data: CellActionDefinition): void {
    const qty: number = data.data.config.formGroup[data.data.index].formGroup.get('quantity').value;
    console.log(qty);
    this.isAddingConsumption$.set(true);

  }
}
