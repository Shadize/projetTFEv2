export interface DetailCardConfig {
    data: any;
    fields: DetailFieldConfig[];
  }

  export interface DetailFieldConfig {
    field: string;
    label: string;
  }
export interface CardActionDefinition {
  icon?: string;
  label?:string;
  action: any;
  data?:any;
}
