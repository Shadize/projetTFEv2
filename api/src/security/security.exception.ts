import {ApiCodeResponse, ApiException} from '@common/api';

export class NoTokenFoundedException extends ApiException {
    constructor() {
        super(ApiCodeResponse.NO_TOKEN_FOUNDED, 401);
    }
}
export class UserNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.USER_NOT_FOUND, 200);
    }
}

export class TokenExpiredException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TOKEN_EXPIRED, 401);
    }
}

export class SignupException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SIGNUP_ERROR, 200);
    }
}

export class CredentialDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CREDENTIAL_DELETE_ERROR, 200);
    }
}

export class CredentialListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CREDENTIAL_LIST_ERROR, 200);
    }
}

export class UserAlreadyExistException extends ApiException {
    constructor() {
        super(ApiCodeResponse.USER_ALREADY_EXIST, 200);
    }
}

export class TokenGenerationException extends ApiException {
    constructor() {
        super(ApiCodeResponse.TOKEN_GEN_ERROR, 500);
    }
}

export class SignInPayloadException extends ApiException{
    constructor(code:ApiCodeResponse) {
        super(code, 200);
    }
}

export class MemberCreateException extends ApiException{
    constructor(){
        super(ApiCodeResponse.MEMBER_CREATE_ERROR, 200)
    }
}

export class MemberUpdateException extends ApiException{
    constructor(){
        super(ApiCodeResponse.MEMBER_UPDATE_ERROR, 200)
    }
}