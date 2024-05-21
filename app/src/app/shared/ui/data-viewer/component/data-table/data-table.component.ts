import {Component, Input} from '@angular/core';
import {DataTableConfig} from '../../config';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input({required: true}) config!: DataTableConfig;
}
