"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
const api_code_response_1 = require("./api-code.response");
class ApiException extends common_1.HttpException {
    constructor(code, status) {
        super({
            code: code,
            data: null,
            result: false
        }, status);
    }
}
exports.ApiException = ApiException;
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        super({
            code: api_code_response_1.ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => Object.values(e.constraints)).flat(),
            result: false
        }, 499);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=api.exception.js.map