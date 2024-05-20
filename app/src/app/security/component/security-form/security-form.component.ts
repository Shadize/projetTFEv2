import {Component, DestroyRef, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FloatingLabelInputComponent,
  FormControlSimpleConfig,
  FormError,
  getConfigToFormGroup,
  handleFormError,
  LabelWithParamPipe
} from '@shared';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SecurityService} from '../../service/security.service';
import {ApiCodeResponse, ApiResponse} from '@api';
import {Observable, tap} from 'rxjs';
import {TranslateModule} from '@ngx-translate/core';
import {SecurityFormEnum} from '../../type';

@Component({
  selector: 'app-security-form',
  standalone: true,
  imports: [CommonModule, FloatingLabelInputComponent, LabelWithParamPipe, ReactiveFormsModule, TranslateModule],
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.scss']
})
export class SecurityFormComponent implements OnInit {
  @Input() formGroupControls!: FormControlSimpleConfig[];
  @Input() title: string = 'security-feature.sign-in-page.title';
  @Input() iconBtn: string = 'fa-solid fa-unlock';
  @Input() formType: SecurityFormEnum = SecurityFormEnum.SIGN_IN;
  destroyRef: DestroyRef = inject(DestroyRef);
  formGroup!: FormGroup;
  readonly securityService: SecurityService = inject(SecurityService);
  errors: WritableSignal<FormError[]> = signal([]);
  apiError: WritableSignal<ApiCodeResponse | null> = signal(null);

  constructor() {
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  signIn(): void {
    if (this.formGroup.valid) {
      const obs: Observable<ApiResponse> = (this.formType === SecurityFormEnum.SIGN_IN) ?
        this.securityService.signIn(this.formGroup.value)
        : this.securityService.signUp(this.formGroup.value);

      obs.pipe(tap((response: ApiResponse) => {
        if (!response.result) {
          this.apiError.set(response.code);
        }
      }))
        .subscribe();
    }
    //here show some errors
  }

  get(key: string): FormControl<any> {
    return this.formGroup.get(key)! as FormControl<any>;
  }

  private initFormGroup(): void {
    this.formGroup = getConfigToFormGroup(this.formGroupControls);
    // handle the error , with unsubscribe
    handleFormError(this.formGroup, this.errors, this.destroyRef);
  }
}
