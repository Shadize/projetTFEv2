import {FormControlSimpleConfig} from '@shared';
import {Observable} from 'rxjs';
import {ApiResponse} from '@api';
import {Payload} from '@core';
export enum SecurityFormEnum{
  SIGN_IN= 'signIn',
  SIGN_UP='signUp'
}
export type SecurityFormConfigFn = () => FormControlSimpleConfig[];
export type SecurityApiValidationFn = (payload: Payload) => Observable<ApiResponse>;
