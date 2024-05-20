import {HttpException, ValidationError} from '@nestjs/common';
import {ApiCodeResponse} from './api-code.response';
import {isNil} from 'lodash';

export class ApiException extends HttpException {
    constructor(code: ApiCodeResponse, status: number) {
        super({
            code: code,
            data: null,
            result: false
        }, status);
    }
}

export class ValidationException extends HttpException {
    constructor(errors: ValidationError[]) {
        super({
            code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => Object.values(e.constraints)).flat(),
            result: false
        }, 499);
    }
}
