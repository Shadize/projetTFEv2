import {Dto, Section} from '@core';

export interface CredentialDto extends Dto {
  credential_id: string;
  username: string;
  firstname: string;
  lastname: string;
  mail: string;
  facebookHash: string;
  googleHash: string;
  isAdmin: boolean;
  section: Section;
}
