import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmDialogConfig} from '../../data';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  @Input() config!: ConfirmDialogConfig;
  @Output() confirm = new EventEmitter<void>;
  @Output() cancel = new EventEmitter<void>;
}
