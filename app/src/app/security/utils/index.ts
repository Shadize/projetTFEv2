import {FormControlSimpleConfig, InputType} from '@shared';
import {SecurityFormConfigFn} from '../type';
import {confirmationControl, mailControl, passwordControl, usernameControl} from './constant';

export const getSignInFormControlsConfig: SecurityFormConfigFn = (): FormControlSimpleConfig[] => {
  return [
    {
      label: 'Identifiant',
      formControl: usernameControl,
      input: 'username',
      inputType:InputType.TEXT
    },
    {
      label: 'Mot de passe',
      formControl: passwordControl,
      input: 'password',
      inputType:InputType.PASSWORD
    },
  ]
}
export const getSignUpFormControlsConfig: SecurityFormConfigFn = (): FormControlSimpleConfig[] => {
  return [
    {
      label: 'Identifiant',
      formControl: usernameControl,
      input: 'username',
      inputType:InputType.TEXT
    },
    {
      label: 'Mot de passe',
      formControl: passwordControl,
      input: 'password',
      inputType:InputType.PASSWORD
    },
    {
      label: 'Confirmation',
      formControl: confirmationControl,
      input: 'confirmation',
      inputType:InputType.PASSWORD
    },
    {
      label: 'Mail',
      formControl: mailControl,
      input: 'mail',
      inputType:InputType.TEXT
    },
  ]
}
