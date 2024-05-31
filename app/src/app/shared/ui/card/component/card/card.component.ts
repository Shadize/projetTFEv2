import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardHeaderComponent} from '../card-header/card-header.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CardHeaderComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title?: string;
  @Input() isTransparent: boolean = false;
}
