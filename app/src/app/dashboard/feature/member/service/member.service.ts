import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  list$: WritableSignal<string[]> = signal(['test user', 'test user2'])
  detail$: WritableSignal<string> = signal('');

  setDetail(id: string): void {
    this.detail$.set(this.list$().find(m => m === 'test user') || 'not found');
  }
}
