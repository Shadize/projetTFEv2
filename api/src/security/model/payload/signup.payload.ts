import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length} from 'class-validator';
import {ApiCodeResponse} from '@common/api';

export class SignupPayload {
    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_USERNAME_IS_MISSING})
    @Length(1, 10, {message: ApiCodeResponse.SIGNUP_PAYLOAD_USERNAME_LENGTH_ERROR})
    username: string

    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_PASSWORD_IS_MISSING})
    @Length(1, 10, {message: ApiCodeResponse.SIGNUP_PAYLOAD_PASSWORD_LENGTH_ERROR})
    password: string

    @ApiProperty()
    @IsNotEmpty({message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING})
    @IsEmail(undefined, {message: ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_INVALID})
    mail: string;
}