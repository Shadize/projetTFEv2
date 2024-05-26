import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Stock, StockDetailComponent, StockService} from '@shelve-feature';
import {tap} from 'rxjs';
import {CardComponent} from '@shared';

@Component({
  selector: 'app-stock-detail-page',
  standalone: true,
  imports: [
    StockDetailComponent,
    CardComponent
  ],
  templateUrl: './stock-detail-page.component.html',
  styleUrl: './stock-detail-page.component.scss'
})
export class StockDetailPageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  public detail$: WritableSignal<Stock | null> = signal(null);

  ngOnInit() {
    this.stockService.detail(this.id).pipe(
      tap((detail: Stock) => this.detail$.set(detail))
    ).subscribe()
  }

}
