import {FormControl, Validators} from '@angular/forms';
import {matchValidator} from '@shared';

export const usernameControl: FormControl = new FormControl<string>('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
export const passwordControl: FormControl = new FormControl<string>('', [Validators.required]);
export const confirmationControl: FormControl = new FormControl<string>('', [Validators.required, matchValidator('password')]);
export const mailControl: FormControl = new FormControl<string>('', [Validators.required]);
