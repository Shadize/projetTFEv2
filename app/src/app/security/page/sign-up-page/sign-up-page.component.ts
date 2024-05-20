import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatingLabelInputComponent, FormControlSimpleConfig, LabelWithParamPipe} from '@shared';
import {getSignUpFormControlsConfig, SecurityFormComponent} from '@security';
import {SecurityService} from '../../service';
import {SecurityFormEnum} from '../../type';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, FloatingLabelInputComponent, LabelWithParamPipe, SecurityFormComponent],
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  readonly securityService: SecurityService = inject(SecurityService);
  formGroupControls: FormControlSimpleConfig[] = getSignUpFormControlsConfig();
  protected readonly SecurityFormEnum = SecurityFormEnum;
}
