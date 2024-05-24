import {Injectable} from '@angular/core';
import {Credential, CredentialDto} from '@security';
import {BusinessUtils} from '@core';
import { MemberAction, MemberKey } from 'app/dashboard/feature/member/data/enum';
import { CellActionDefinition, DataTableConfig, MinimalVisibilityWidth } from '@shared';

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

  public fromDTOS(dtos: CredentialDto[]): Credential[] {
    return dtos.map(d => this.fromDTO(d));
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


  public getDataTableConfig(credentials: Credential[], isAdmin: boolean): DataTableConfig {
    let actions: CellActionDefinition[] = [
      {
        icon: 'fa-solid fa-eye',
        action: MemberAction.DETAIL
      }
    ]
    if (isAdmin) {
      actions.push({
        icon: 'fa-solid fa-pencil',
        action: MemberAction.EDIT
      });
      actions.push({
        icon: 'fa-solid fa-trash',
        action: MemberAction.DELETE
      });
    }
    return {
      translateKey: 'admin-feature-member.table.label.',
      data: credentials,
      cellDefinitions: [
        {
          targetData: MemberKey.USERNAME,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false
        },
        {
          targetData: MemberKey.MAIL,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false
        },
        {
          targetData: MemberKey.ISADMIN,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false
        },
        {
          targetData: '',
          actions,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: true
        }
      ]
    }
  }
}
