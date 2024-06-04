import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardHeaderComponent} from '../card-header/card-header.component';
import {CellActionDefinition} from '../../../data-viewer';
import {CardActionDefinition} from '../../data';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardHeaderComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title?: string;
  @Input() actions? :CardActionDefinition[];
  @Input() isTransparent: boolean = false;
  @Input() params: any = {};
  @Output() actionClicked = new EventEmitter<CardActionDefinition>();
}
