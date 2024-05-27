import { Section } from '@common/data';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiCodeResponse } from '@common/api';

export class CredentialUpdatePayload {

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  credential_id: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  mail: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  isAdmin: boolean;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  active: boolean;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  section: Section;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  firstname: string;

  @ApiProperty()
  @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
  lastname: string;
}