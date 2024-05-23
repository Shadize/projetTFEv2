import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Stock, StockDetailComponent, StockService} from '@shelve-feature';
import {tap} from 'rxjs';

@Component({
  selector: 'app-stock-admin-detail-page',
  standalone: true,
  imports: [
    StockDetailComponent
  ],
  templateUrl: './stock-admin-detail-page.component.html',
  styleUrl: './stock-admin-detail-page.component.scss'
})
export class StockAdminDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  public detail$: WritableSignal<Stock | null> = signal(null);

  ngOnInit() {
    this.stockService.detail(this.id).pipe(
      tap((detail: Stock) => this.detail$.set(detail))
    ).subscribe()
  }

}
