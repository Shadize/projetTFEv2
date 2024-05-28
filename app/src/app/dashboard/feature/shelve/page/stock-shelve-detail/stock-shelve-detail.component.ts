import {Component, computed, DestroyRef, inject, Input, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockService, StockUtilsService} from '@shelve-feature';
import {
  CardComponent,
  CardHeaderComponent,
  DataTableComponent,
  DataTableConfig,
  DetailNotFoundComponent
} from '@shared';
import {flatten} from 'lodash';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';

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
  protected stockUtils: StockUtilsService = inject(StockUtilsService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public destroyRef: DestroyRef = inject(DestroyRef);
  public detail$: WritableSignal<Stock> = signal(this.stockUtils.getEmpty());
  public shelveDataTableConfig$: Signal<DataTableConfig> = computed(() => this.genConfig(this.detail$()));


  ngOnInit() {
    this.stockService.detail(this.id).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((stock: Stock) => this.detail$.set(stock))
    ).subscribe()
  }

  genConfig(stock: Stock): DataTableConfig {
    return this.shelveUtils.getDataTableConfig(stock.shelves);
  }
}

