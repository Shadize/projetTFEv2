import {Component, inject} from '@angular/core';
import {ToastComponent} from '../toast/toast.component';
import {ToastService} from '../../service/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [
    ToastComponent
  ],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss'
})
export class ToastContainerComponent {
  protected readonly toastService:ToastService = inject(ToastService);
  remove(id:string):void{
    this.toastService.remove(id);
  }

}
