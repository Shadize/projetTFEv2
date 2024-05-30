import {Business} from '@core';
import {ProductType} from '@product-feature';
import {ConsumptionStatus} from '@consumption-feature';
import {Credential} from '@security';

export interface Consumption extends Business {
  order_date: Date; // readonly et contient la date du jours
  delivery_date: Date; // si retrait directe on met la date du jours et le champ n'apparait ou en readonly
  quantity: number; // provient de la méthode consume
  is_reserved: boolean;
  is_delivered: boolean; // Faire un selectbox avec genre ConsumptionType.RESERVATION , ConsumpTionType.DIRECT_REMOVE
  type: ProductType; // reprendre le type du produit
  status: ConsumptionStatus; // Select box
  author: Credential; // on fournit pas on le récupèrera depuis l'api avec @User
  shelve: string; // shelve.str
  shelve_reference: string; //locationReference
  productName:string;
}
