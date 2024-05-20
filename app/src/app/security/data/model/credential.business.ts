import {Business} from '@core';

export interface Credential extends Business {
  username: string;
  mail: string;
  facebookHash: string;
  googleHash: string;
  isAdmin: boolean;
}
