import {Component, Input} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-detail-not-found',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './detail-not-found.component.html',
  styleUrl: './detail-not-found.component.scss'
})
export class DetailNotFoundComponent {
  @Input({required:true}) message!:string;
}
