import {Business} from '@core';

export interface DataTableConfig {
  data: any[];
  cellDefinitions: CellDefinition[];
  translateKey:string;
}

export interface CellDefinition {
  targetData: string;
  actions?: CellActionDefinition[],
  minimalWidthVisibility:MinimalVisibilityWidth;
}

export interface CellActionDefinition {
  icon: string;
  action: any;
}

export enum MinimalVisibilityWidth{
  SMALL='small',
  MEDIUM='medium',
  LARGE='large',
  X_LARGE='x-large'
}
