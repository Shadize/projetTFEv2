import {Payload} from '@core';
import {Stock} from '@shelve-feature';

export interface ShelveCreatePayload extends Payload {
  location: Stock;
  rack: string;
  floor: string;
  nb_items_max: number;
  surface: number;
  width: number;
  height: number;
}
