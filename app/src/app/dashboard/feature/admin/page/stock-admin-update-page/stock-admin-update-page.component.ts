import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Stock, StockService} from '@shelve-feature';
import {JsonPipe} from '@angular/common';
import {ShelveAdminFormComponent} from '../../component';
import {tap} from 'rxjs';

@Component({
  selector: 'app-stock-admin-update-page',
  standalone: true,
  imports: [
    JsonPipe,
    ShelveAdminFormComponent
  ],
  templateUrl: './stock-admin-update-page.component.html',
  styleUrl: './stock-admin-update-page.component.scss'
})
export class StockAdminUpdatePageComponent implements OnInit {
  @Input() id!: string;
  protected stockService: StockService = inject(StockService);
  public detail$: WritableSignal<Stock | null> = signal(null);

  ngOnInit() {
    this.stockService.detail(this.id).pipe(
      tap((detail: Stock) => this.detail$.set(detail))
    ).subscribe()
  }
}
