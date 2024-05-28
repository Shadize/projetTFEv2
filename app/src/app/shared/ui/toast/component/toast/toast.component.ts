import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Toast} from '@shared';
import {tap, timer} from 'rxjs';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit{
  @Input({required: true}) toast!: Toast;
  @Output() remove = new EventEmitter<string>();
  ngOnInit(): void {
      timer(this.toast.delay ?? 10000).pipe(
        tap(() => this.close())
      ).subscribe();
  }
  close():void{
    this.remove.emit(this.toast.id);
  }
}
