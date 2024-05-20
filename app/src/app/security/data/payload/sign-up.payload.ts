import {Payload} from '@core';

export interface SignUpPayload extends Payload {
  username: string;
  password: string;
  mail: string;
}
