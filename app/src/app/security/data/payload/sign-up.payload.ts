import {Payload, Section} from '@core';

export interface SignUpPayload extends Payload {
  username: string;
  password: string;
  mail: string;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  section: Section;
}
