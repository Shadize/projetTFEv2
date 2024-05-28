import {Business} from '@core';
import {FieldTypeConfig} from '../../form/data/config/form.config';
import {FormGroup} from '@angular/forms';

export interface DataTableConfig {
  data: any[];
  cellDefinitions: CellDefinition[];
  translateKey: string;
  label?: string;
}

export interface CellDefinition {
  formGroup?:CellFormGroupDefinition[];
  targetData: string;
  actions?: CellActionDefinition[],
  minimalWidthVisibility: MinimalVisibilityWidth;
  isMinimalWidth: boolean;
}
export interface CellFormGroupDefinition{
  config:FieldTypeConfig,
  formGroup:FormGroup
}
export interface CellActionDefinition {
  icon: string;
  action: any;
  data?:any;
}

export enum MinimalVisibilityWidth {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large'
}
