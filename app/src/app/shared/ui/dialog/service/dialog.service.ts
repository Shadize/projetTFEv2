import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public viewContainerRef!: ViewContainerRef;
  private static instance: DialogService | null = null;

  constructor() {
    DialogService.instance = this;
  }

  public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.viewContainerRef = viewContainerRef
  }

  public static getInstance() {
    return DialogService.instance;
  }
}
