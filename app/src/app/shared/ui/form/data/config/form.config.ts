import {Business} from '@core';
import {Validators} from '@angular/forms';

export interface FormConfig{
  data:Business;
  fields:string[];
  validators:FormValidatorsConfig[]
}
export interface FormValidatorsConfig{
  field:string;
  validators:Validators[]
}

/*
{ field:'width', validators:[Validators.required]
 */
