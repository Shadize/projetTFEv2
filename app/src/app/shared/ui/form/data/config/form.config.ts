import { Business } from '@core';
import { Validators } from '@angular/forms';

export interface FormConfig {
  data: Business; 
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
  options?: any[]; // Utilisé uniquement pour les champs de type 'select'
}
