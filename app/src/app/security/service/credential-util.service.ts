import {Injectable} from '@angular/core';
import {Credential, CredentialDto} from '@security';
import {BusinessUtils} from '@core';

@Injectable({
  providedIn: 'root'
})
export class CredentialUtilService implements BusinessUtils<Credential, CredentialDto> {
  getEmpty(): Credential {
    return {
      facebookHash: '', googleHash: '', id: '', isAdmin: false, isEmpty: true, mail: '', str: '', username: ''

    }
  }

  fromDTO(dto: CredentialDto): Credential {
    return {
      facebookHash: dto.facebookHash,
      googleHash: dto.googleHash,
      id: dto.credential_id,
      isAdmin: dto.isAdmin,
      isEmpty: false,
      mail: dto.mail,
      str: `${dto.username.substring(0,1).toUpperCase()}${dto.username.substring(1,dto.username.length)}`,
      username: dto.username
    }
  }

  toDTO(business: Credential): CredentialDto {
    return {
      facebookHash: business.facebookHash,
      googleHash: business.googleHash,
      credential_id: business.id,
      isAdmin: business.isAdmin,
      mail: business.mail,
      username: business.username
    }
  }
}
