import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Shelve, Stock} from '../../data';
import {TranslateModule} from '@ngx-translate/core';
import {StockPlanComponent} from '../stock-plan/stock-plan.component';
import {Router} from '@angular/router';
import {AppRoutes, DataTableComponent, DataTableConfig} from '@shared';
import {ShelveUtilsService} from '../../service';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [
    TranslateModule,
    StockPlanComponent,
    DataTableComponent
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss'
})
export class StockDetailComponent implements OnInit {
  @Input() detail!: Stock;
  private readonly router: Router = inject(Router);
  private readonly shelveUtils: ShelveUtilsService = inject(ShelveUtilsService);
  public shelveDataTableConfig$!: WritableSignal<DataTableConfig>;

  ngOnInit(): void {
    this.shelveDataTableConfig$ = signal(this.shelveUtils.getDataTableConfig(this.detail.shelves));
  }


  onRackClickHandle(shelve: Shelve): void {
    this.router.navigate([AppRoutes.STOCK_SHELVE_DETAIL.replace(':id', shelve.id)]).then();
  }

  onRowClickHandle(shelve: Shelve): void {
    this.router.navigate([AppRoutes.SHELVE_DETAIL.replace(':id', shelve.id)]).then();
  }
}
