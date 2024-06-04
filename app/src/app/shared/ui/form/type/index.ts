import {FormControl, FormGroup} from '@angular/forms';
import {DestroyRef, WritableSignal} from '@angular/core';
export enum InputType{
  TEXT='text',
  PASSWORD='password',
  COLOR='color'
}
export interface FormControlSimpleConfig {
  label?: string;
  formControl: FormControl,
  input: string;
  inputType:InputType;
  placeholder?:string;
  readonly?:boolean;
}

export interface FormError {
  control: string;
  value: any;
  error: string;
}
export type HandleFormErrorFn = (form: FormGroup, signal: WritableSignal<FormError[]>, destroyRef?: DestroyRef) => void;
export type HandleValueChangeFn = (form: FormGroup, callback:Function,me:any, destroyRef?: DestroyRef) => void;
export type GetAllFormErrorsFn = (form: FormGroup) => FormError[];
export type ConfigToFormGroupFn = (config: FormControlSimpleConfig[]) => FormGroup;
