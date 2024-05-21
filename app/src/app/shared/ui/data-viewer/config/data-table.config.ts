import {Business} from '@core';

export interface DataTableConfig {
  data: any[];
  cellDefinitions: CellDefinition[];
  translateKey: string;
  label?: string;
}

export interface CellDefinition {
  targetData: string;
  actions?: CellActionDefinition[],
  minimalWidthVisibility: MinimalVisibilityWidth;
  isMinimalWidth: boolean;
}

export interface CellActionDefinition {
  icon: string;
  action: any;
}

export enum MinimalVisibilityWidth {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x-large'
}
