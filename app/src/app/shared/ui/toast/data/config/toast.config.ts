export type Toast = {
  id: string;
  type: ToastType;
  body: string;
  delay?: number;
  actions?: ToastAction[];
}
export type ToastAction = {
  label?: string;
  icon?: string;
  callBack: Function;
}
export enum ToastType{
  WARNING='warning',
  SUCCESS='success',
  ERROR='error'
}
