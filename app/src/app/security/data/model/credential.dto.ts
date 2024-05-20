import {Dto} from '@core';

export interface CredentialDto extends Dto {
  credential_id: string;
  username: string;
  mail: string;
  facebookHash: string;
  googleHash: string;
  isAdmin: boolean;

}
