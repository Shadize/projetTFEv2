import { HttpException, ValidationError } from '@nestjs/common';
import { ApiCodeResponse } from './api-code.response';
export declare class ApiException extends HttpException {
    constructor(code: ApiCodeResponse, status: number);
}
export declare class ValidationException extends HttpException {
    constructor(errors: ValidationError[]);
}
