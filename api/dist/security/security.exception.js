"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberUpdateException = exports.MemberCreateException = exports.SignInPayloadException = exports.TokenGenerationException = exports.UserAlreadyExistException = exports.CredentialListException = exports.CredentialDeleteException = exports.SignupException = exports.TokenExpiredException = exports.UserNotFoundException = exports.NoTokenFoundedException = void 0;
const api_1 = require("../common/api");
class NoTokenFoundedException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.NO_TOKEN_FOUNDED, 401);
    }
}
exports.NoTokenFoundedException = NoTokenFoundedException;
class UserNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.USER_NOT_FOUND, 200);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class TokenExpiredException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.TOKEN_EXPIRED, 401);
    }
}
exports.TokenExpiredException = TokenExpiredException;
class SignupException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.SIGNUP_ERROR, 200);
    }
}
exports.SignupException = SignupException;
class CredentialDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CREDENTIAL_DELETE_ERROR, 200);
    }
}
exports.CredentialDeleteException = CredentialDeleteException;
class CredentialListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CREDENTIAL_LIST_ERROR, 200);
    }
}
exports.CredentialListException = CredentialListException;
class UserAlreadyExistException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.USER_ALREADY_EXIST, 200);
    }
}
exports.UserAlreadyExistException = UserAlreadyExistException;
class TokenGenerationException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.TOKEN_GEN_ERROR, 500);
    }
}
exports.TokenGenerationException = TokenGenerationException;
class SignInPayloadException extends api_1.ApiException {
    constructor(code) {
        super(code, 200);
    }
}
exports.SignInPayloadException = SignInPayloadException;
class MemberCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.MEMBER_CREATE_ERROR, 200);
    }
}
exports.MemberCreateException = MemberCreateException;
class MemberUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.MEMBER_UPDATE_ERROR, 200);
    }
}
exports.MemberUpdateException = MemberUpdateException;
//# sourceMappingURL=security.exception.js.map