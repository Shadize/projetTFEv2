import {Business} from '@core';
import {ProductType} from '@product-feature';
import {ConsumptionStatus} from '@consumption-feature';
import {Credential} from '@security';
import {ConsumptionType} from './enum/consumption-type.enum';

export interface Consumption extends Business {
  order_date: Date; // readonly et contient la date du jours
  order_date_str:string;
  delivery_date?: Date; // si retrait directe on met la date du jours et le champ n'apparait ou en readonly
  delivery_date_str:string;
  quantity: number; // provient de la méthode consume
  is_reserved: boolean;
  is_delivered: boolean; // Faire un selectbox avec genre ConsumptionType.RESERVATION , ConsumpTionType.DIRECT_REMOVE
  type: ProductType; // reprendre le type du produit
  status: ConsumptionStatus; // Select box
  author: Credential; // on fournit pas on le récupèrera depuis l'api avec @User
  shelve: string; // shelve.str
  shelve_reference: string; //locationReference
  productName:string;
  consumption_type:ConsumptionType;
}

export interface ConsumptionForm{
  order_date:string;
  consumption_type:ConsumptionType;
  qty:number;
  delivery_date: string;
  is_delivered: boolean;
}
