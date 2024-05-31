import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CellActionDefinition, DataTableConfig} from '../../config';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslateModule,
    NgSwitchCase,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchDefault
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input({required: true}) config!: DataTableConfig;
  @Output() actionClicked = new EventEmitter<CellActionDefinition>();
  @Output() rowClicked = new EventEmitter<any>();

  


  onActionClicked(item: any, action: CellActionDefinition, index: number): void {
    const config = this.config.cellDefinitions.find(cd => cd.formGroup);
    let data: any = item;
    if (config) {
      data = {item, config, index};
    }
    this.actionClicked.emit({...action, data})
  }
}
