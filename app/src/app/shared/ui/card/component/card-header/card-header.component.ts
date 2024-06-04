import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CardActionDefinition} from '../../data';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent {
  @Input() title?: string;
  @Input() actions?: CardActionDefinition[];
  @Input() params: any = {};
  @Output() actionClicked = new EventEmitter<CardActionDefinition>();

  onClick(action: CardActionDefinition) {
    if(!action.isDisabled){
      this.actionClicked.emit(action)
    }
  }
}
