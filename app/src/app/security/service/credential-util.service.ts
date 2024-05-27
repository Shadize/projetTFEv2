import {Injectable} from '@angular/core';
import {Credential, CredentialDto} from '@security';
import {BusinessUtils, Section} from '@core';
import { MemberAction, MemberKey } from 'app/dashboard/feature/member/data/enum';
import { CellActionDefinition, DataTableConfig, MinimalVisibilityWidth } from '@shared';
import { Validators } from '@angular/forms';
import { ProductKeyForm, ProductType } from '@product-feature';
import { FormConfig, FormValidatorsConfig, FieldTypeConfig, FieldSelectOption } from 'app/shared/ui/form/data/config/form.config';
import { flatten } from 'lodash';
import { SignUpPayload } from '../data/payload/sign-up.payload';

@Injectable({
  providedIn: 'root'
})
export class CredentialUtilService implements BusinessUtils<Credential, CredentialDto> {
  getEmpty(): Credential {
    return {
      facebookHash: '',
      googleHash: '',
      id: '',
      isAdmin: false,
      isEmpty: true,
      mail: '',
      str: '',
      username: '',
      firstname: '',
      lastname: '',
      section: Section.WOOD
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
      username: dto.username,
      section : dto.section,
      firstname: dto.firstname,
      lastname: dto.lastname
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
      username: business.username,
      firstname: business.firstname,
      lastname: business.lastname,
      section : business.section
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

  public getDataFormConfig(credantial: Credential): FormConfig {
    const fields = Object.values(MemberKey);

    const validatorsConfig: FormValidatorsConfig[] = fields.map(field => {
      let fieldValidators = [];

      switch (field) {
        case MemberKey.MAIL:
          fieldValidators.push(Validators.required, Validators.minLength(3));
          break;
          case MemberKey.USERNAME:
            fieldValidators.push(Validators.required, Validators.min(1));
            break;
        case MemberKey.FIRSTNAME:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case MemberKey.LASTNAME:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case MemberKey.ISADMIN:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        case MemberKey.SECTION:
          fieldValidators.push(Validators.required, Validators.min(0));
          break;
        default:
          // Add default validators if needed
          break;
      }

      return {field, validators: fieldValidators};
    });

    const fieldTypesConfig: FieldTypeConfig[] = fields.map(field => {
      let fieldType = 'text';
      let fieldOptions: FieldSelectOption[] = [];

      if (field === MemberKey.SECTION) {
        fieldType = 'select';
        fieldOptions = Object.values(Section).map(
          o => ({
            selected: credantial.section === o,
            value: o,
            label: `feature.product.type.${o.toLowerCase()}`
          })
        );
      }
      return {field, type: fieldType, options: fieldOptions};
    });

    return {
      data: credantial,
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig
    };
  }


  genCreatePayload(credential: any) : SignUpPayload{
    return {
      username: credential.username,
      password: credential.password,
      mail: credential.mail,
      isAdmin: credential.isAdmin,
      firstname: credential.firstname,
      lastname: credential.lastname,
      section: credential.section
    }
  }

}
