import {Component, Input} from '@angular/core';
import {DataTableConfig} from '../../config';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslateModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input({required: true}) config!: DataTableConfig;
}
