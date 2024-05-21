import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  FloatingLabelInputComponent, FormControlSimpleConfig,
  LabelWithParamComponent,
  LabelWithParamDirective,
  LabelWithParamPipe
} from '@shared';
import {SecurityFormComponent} from '../../component';
import {getSignInFormControlsConfig} from '../../utils';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, FloatingLabelInputComponent, ReactiveFormsModule, LabelWithParamComponent, LabelWithParamDirective, LabelWithParamPipe, SecurityFormComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  formGroupControls: FormControlSimpleConfig[] = getSignInFormControlsConfig();
}
