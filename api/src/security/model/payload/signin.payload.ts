import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, Length} from 'class-validator';
import {ApiCodeResponse} from '@common/api';

export class SignInPayload {
    @ApiProperty()
    @IsNotEmpty({message:ApiCodeResponse.SIGN_IN_PAYLOAD_USERNAME_MISSING})
    @Length(1,10,{message:ApiCodeResponse.SIGN_IN_PAYLOAD_USERNAME_LENGTH_ERROR})
    username: string;

    @IsNotEmpty({message:ApiCodeResponse.SIGN_IN_PAYLOAD_PASSWORD_MISSING})
    @ApiProperty()
    password: string;

}