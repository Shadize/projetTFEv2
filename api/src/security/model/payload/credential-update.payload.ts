import { Section } from '@common/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class CredentialUpdatePayload {

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_ID_MISSING_ERROR})
  credential_id: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_USERNAME_MISSING_ERROR})
  username: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_PASSWORD_MISSING_ERROR})
  password: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_MAIL_MISSING_ERROR})
  mail: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_ISADMIN_MISSING_ERROR})
  isAdmin: boolean;

  @ApiProperty()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_SECTION_MISSING_ERROR})
  section: Section;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_FIRSTNAME_MISSING_ERROR})
  firstname: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.CREDENTIAL_LASTNAME_MISSING_ERROR})
  lastname: string;
}