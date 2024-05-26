import {Component, computed, inject, Input, OnInit, Signal} from '@angular/core';
import {Shelve, ShelveUtilsService, Stock, StockDetailComponent, StockService} from '@shelve-feature';
import {tap} from 'rxjs';
import {CardComponent, CardHeaderComponent, DetailNotFoundComponent} from '@shared';
import {flatten} from 'lodash';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-shelve-detail-page',
  standalone: true,
  imports: [
    StockDetailComponent,
    CardComponent,
    CardHeaderComponent,
    TranslateModule,
    DetailNotFoundComponent
  ],
  templateUrl: './shelve-detail-page.component.html',
  styleUrl: './shelve-detail-page.component.scss'
})
export class ShelveDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  protected shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public detail$: Signal<Shelve> = computed(() => this.getShelveDetail(this.stockService.list$()));

  ngOnInit() {
  }

  getShelveDetail(stocks: Stock[] | undefined): Shelve {
    if (stocks) {
      return flatten(stocks.map(s => s.shelves)).find(s => s.id === this.id) ?? this.shelveUtils.getEmpty();
    }

    return this.shelveUtils.getEmpty();

  }
}
