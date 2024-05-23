import {Component, Input} from '@angular/core';
import {Stock} from '../../data';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.scss'
})
export class StockDetailComponent {
  @Input() detail!:Stock
}
