import {Component} from '@angular/core';
import {DataTableComponent, DataTableConfig, MinimalVisibilityWidth} from '@shared';

@Component({
  selector: 'app-shelve-management-page',
  standalone: true,
  imports: [
    DataTableComponent
  ],
  templateUrl: './shelve-management-page.component.html',
  styleUrl: './shelve-management-page.component.scss'
})
export class ShelveManagementPageComponent {
  protected data: any[] = [
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'},
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'},
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'},
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'},
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'},
    {a: 'val 1a', b: 'valb', c: 'valc', d: 'vald', e: 'vale'}
  ]
  protected config: DataTableConfig = {
    data: this.data,
    translateKey: '',
    cellDefinitions: [
      {targetData: 'a', minimalWidthVisibility:MinimalVisibilityWidth.SMALL},
      {targetData: 'b', minimalWidthVisibility:MinimalVisibilityWidth.SMALL},
      {targetData: 'c', minimalWidthVisibility:MinimalVisibilityWidth.SMALL},
      {targetData: 'd', minimalWidthVisibility:MinimalVisibilityWidth.MEDIUM},
      {targetData: 'e',minimalWidthVisibility:MinimalVisibilityWidth.LARGE},
    ]
  }
}
