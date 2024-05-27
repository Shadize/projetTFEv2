import {Business, Section} from '@core';

export interface Credential extends Business {
  username: string;
  firstname: string;
  lastname: string;
  mail: string;
  facebookHash: string;
  googleHash: string;
  isAdmin: boolean;
  section: Section;
}
