import { ApiCodeResponse, ApiException } from '@common/api';
export declare class NoTokenFoundedException extends ApiException {
    constructor();
}
export declare class UserNotFoundException extends ApiException {
    constructor();
}
export declare class TokenExpiredException extends ApiException {
    constructor();
}
export declare class SignupException extends ApiException {
    constructor();
}
export declare class CredentialDeleteException extends ApiException {
    constructor();
}
export declare class CredentialListException extends ApiException {
    constructor();
}
export declare class UserAlreadyExistException extends ApiException {
    constructor();
}
export declare class TokenGenerationException extends ApiException {
    constructor();
}
export declare class SignInPayloadException extends ApiException {
    constructor(code: ApiCodeResponse);
}
export declare class MemberCreateException extends ApiException {
    constructor();
}
export declare class MemberUpdateException extends ApiException {
    constructor();
}
