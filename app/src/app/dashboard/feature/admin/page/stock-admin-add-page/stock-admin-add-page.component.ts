import {Component, inject, OnInit} from '@angular/core';
import {ShelveAdminFormComponent} from '../../component';
import {StockUtilsService} from '../../../shelve/service';
import {Stock} from '@shelve-feature';


@Component({
  selector: 'app-stock-admin-add-page',
  standalone: true,
  imports: [
    ShelveAdminFormComponent
  ],
  templateUrl: './stock-admin-add-page.component.html',
  styleUrl: './stock-admin-add-page.component.scss'
})
export class StockAdminAddPageComponent implements OnInit {
  private stockUtils: StockUtilsService = inject(StockUtilsService);
  stock: Stock = this.stockUtils.getEmpty();

  ngOnInit() {
  }
}
