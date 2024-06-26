import { mailControl } from './../utils/constant';
import { Injectable } from '@angular/core';
import { Credential, CredentialDto } from '@security';
import { BusinessUtils, Section } from '@core';
import {
  MemberAction,
  MemberIsAdminKey,
  MemberKey,
} from 'app/dashboard/feature/member/data/enum';
import {
  CellActionDefinition,
  DataTableConfig,
  MinimalVisibilityWidth,
} from '@shared';
import { Validators } from '@angular/forms';
import { ProductKeyForm, ProductType } from '@product-feature';
import {
  FormConfig,
  FormValidatorsConfig,
  FieldTypeConfig,
  FieldSelectOption,
} from 'app/shared/ui/form/data/config/form.config';
import { flatten } from 'lodash';
import { SignUpPayload } from '../data/payload/sign-up.payload';
import { CredentialCreatePayload, CredentialUpdatePayload } from 'app/dashboard/feature/member/data';

@Injectable({
  providedIn: 'root',
})
export class CredentialUtilService
  implements BusinessUtils<Credential, CredentialDto>
{
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
      section: Section.WOOD,
    };
  }

  fromDTO(dto: CredentialDto): Credential {
    return {
      facebookHash: '',
      googleHash: '',
      id: dto.credential_id,
      isAdmin: dto.isAdmin,
      isEmpty: false,
      mail: dto.mail,
      str: `${dto.username
        .substring(0, 1)
        .toUpperCase()}${dto.username.substring(1, dto.username.length)}`,
      username: dto.username,
      section: dto.section,
      firstname: dto.firstname,
      lastname: dto.lastname,
    };
  }

  public fromDTOS(dtos: CredentialDto[]): Credential[] {
    return dtos.map((d) => this.fromDTO(d));
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
      section: business.section,
    };
  }

  public toDTOS(business : Credential[]) : CredentialDto[]{
    return business.map((d) => this.toDTO(d));
  }

  public getDataTableConfig(
    credentials: Credential[],
    isAdmin: boolean
  ): DataTableConfig {
    let actions: CellActionDefinition[] = [
    ];
    if (isAdmin) {
      actions.push({
        icon: 'fa-solid fa-pencil',
        action: MemberAction.EDIT,
      });
      actions.push({
        icon: 'fa-solid fa-trash',
        action: MemberAction.DELETE,
      });
    }
    return {
      translateKey: 'admin-feature-member.table.label.',
      data: credentials,
      cellDefinitions: [
        {
          targetData: MemberKey.USERNAME,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: false,
        },
        {
          targetData: MemberKey.MAIL,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: MemberKey.ISADMIN,
          minimalWidthVisibility: MinimalVisibilityWidth.MEDIUM,
          isMinimalWidth: false,
        },
        {
          targetData: '',
          actions,
          minimalWidthVisibility: MinimalVisibilityWidth.SMALL,
          isMinimalWidth: true,
        },
      ],
    };
  }

  public getDataFormConfig(credantial: Credential, submitTitle:string): FormConfig {
    const fields = Object.values(MemberKey);

    const validatorsConfig: FormValidatorsConfig[] = fields.map((field) => {
      let fieldValidators = [];

      switch (field) {
        case MemberKey.USERNAME:
          fieldValidators.push(Validators.required, Validators.minLength(3));
          break;
        case MemberKey.PASSWORD:
          fieldValidators.push(Validators.required, Validators.minLength(3));
          break;
        case MemberKey.MAIL:
          fieldValidators.push(Validators.required, Validators.email);
          break;
        case MemberKey.FIRSTNAME:
          fieldValidators.push(Validators.required, Validators.minLength(2));
          break;
        case MemberKey.LASTNAME:
          fieldValidators.push(Validators.required, Validators.minLength(2));
          break;
        case MemberKey.ISADMIN:
          fieldValidators.push(Validators.required);
          break;
        case MemberKey.SECTION:
          fieldValidators.push(Validators.required);
          break;
        default:
          // Add default validators if needed
          break;
      }

      return { field, validators: fieldValidators };
    });

    const fieldTypesConfig: FieldTypeConfig[] = fields.map((field) => {
      let fieldType = 'text';
      let fieldOptions: FieldSelectOption[] = [];

      if (field === MemberKey.SECTION) {
        fieldType = 'select';
        fieldOptions = Object.values(Section).map((o) => ({
          selected: credantial.section === o,
          value: o,
          label: `app.common.section.${o.toLowerCase()}`,
        }));
      }

      else if(field === MemberKey.ISADMIN){
        fieldType = 'select';
        fieldOptions = Object.values(MemberIsAdminKey).map((o) => ({
          selected: credantial.isAdmin === this.stringToBoolean(o),
          value: o,
          label: `feature.member.isAdmin.${o.toLowerCase()}`
        }))
      }
      return { field, type: fieldType, options: fieldOptions };
    });

    return {
      submitTitle,
      translateKey:'feature.credential.form.label.',
      data: credantial,
      fields,
      validators: validatorsConfig,
      fieldTypes: fieldTypesConfig,
    };
  }

  genCreatePayload(credential: any): CredentialCreatePayload {
    return {
      username: credential.username,
      password: credential.password,
      mail: credential.mail,
      isAdmin : credential.isAdmin,
      section: credential.section,
      firstname: credential.firstname,
      lastname: credential.lastname

    };
  }

  genUpdatePayload(credential: Credential): CredentialUpdatePayload {
    return {
      ...this.genCreatePayload(credential),
      credential_id : credential.id

    };
  }


  stringToBoolean(value: string): boolean{
    return value.toLowerCase() === 'true';
  }
}
