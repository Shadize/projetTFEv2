import { Component, Input } from '@angular/core';
import { DetailCardConfig } from '../../data/config/card-config';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.scss'
})
export class DataCardComponent {
  @Input({ required: true }) config!: DetailCardConfig;


  fieldsToDisplay: any[] = [];

  ngOnChanges(): void {
    this.initializeFields();
  }

  private initializeFields(): void {
    this.fieldsToDisplay = this.config.fields.map(fieldConfig => {
      return {
        label: fieldConfig.label,
        value: this.config.data[fieldConfig.field]
      };
    });
  }
}
