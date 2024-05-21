import {Payload, Section} from '@core';

export interface StockUpdatePayload extends Payload{
  section: Section;
}
