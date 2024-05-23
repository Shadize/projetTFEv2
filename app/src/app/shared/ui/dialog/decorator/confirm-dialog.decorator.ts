import {ConfirmDialogConfig} from '../data';
import {DialogService} from '../service';
import {ConfirmDialogComponent} from '../component';

const defaultData = {
  title: 'app.common.confirm.title',
  message: 'app.common.confirm.message'
}

export function confirmDialog(confirmData: ConfirmDialogConfig = defaultData) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any) {
      console.log('im here', DialogService.getInstance()?.viewContainerRef);
      const component = DialogService.getInstance()?.viewContainerRef.createComponent(ConfirmDialogComponent);
      if (component?.instance) {
        component.instance.config = confirmData;
        component.instance.confirm.subscribe(() => {
          originalMethod.apply(this, args);
          component.destroy();
        })
        component.instance.cancel.subscribe(() => component.destroy());
      }
      return descriptor;
    };
  }
}
