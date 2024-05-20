import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SecurityService} from '../../service/security.service';
import {CardComponent, CardHeaderComponent, LabelWithParamPipe} from '@shared';

@Component({
  selector: 'app-parameter-page',
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, LabelWithParamPipe],
  templateUrl: './parameter-page.component.html',
  styleUrls: ['./parameter-page.component.scss']
})
export class ParameterPageComponent {
  readonly securityService:SecurityService = inject(SecurityService);
  protected readonly Object = Object;
  protected readonly String = String;
}
