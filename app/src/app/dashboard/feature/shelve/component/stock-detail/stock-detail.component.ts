import {Component, Input} from '@angular/core';
import {Stock} from '../../data';
import {TranslateModule} from '@ngx-translate/core';
import {StockPlanComponent} from '../stock-plan/stock-plan.component';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [
    TranslateModule,
    StockPlanComponent
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss'
})
export class StockDetailComponent {
  @Input() detail!: Stock;
}
