import {Business} from '@core';
import {Validators} from '@angular/forms';

export interface FormConfig{
  fields:string[];
  validators:FormValidatorsConfig[]
}
export interface FormValidatorsConfig{
  field:string;
  validators:Validators[]
}

/*
Exemple de ce qu'on enverrai comme donnée, on bouclerai sur le tableau de filds et on y mettrais les validators requis
{ field:'width', validators:[Validators.required]
 */
