import {Payload, Section} from '@core';

export interface SignUpPayload extends Payload {
  username: string;
  password: string;
  mail: string;
  section: Section;
}
