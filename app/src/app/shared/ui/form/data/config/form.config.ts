import {Business} from '@core';
import {Validators} from '@angular/forms';

export interface FormConfig {
  submitTitle: string;
  data: any;
  fields: string[];
  validators: FormValidatorsConfig[];
  fieldTypes?: FieldTypeConfig[];
}

export interface FormValidatorsConfig {
  field: string;
  validators: Validators[];
}

export interface FieldTypeConfig {
  field: string;
  type: string;
  options?: FieldSelectOption[]; // Utilisé uniquement pour les champs de type 'select'
  readOnly? : boolean;
}

export interface FieldSelectOption {
  selected: boolean;
  value: any;
  label: string;
}
