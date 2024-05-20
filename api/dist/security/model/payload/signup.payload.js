"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const api_1 = require("../../../common/api");
class SignupPayload {
}
exports.SignupPayload = SignupPayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_USERNAME_IS_MISSING }),
    (0, class_validator_1.Length)(1, 10, { message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_USERNAME_LENGTH_ERROR }),
    __metadata("design:type", String)
], SignupPayload.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_PASSWORD_IS_MISSING }),
    (0, class_validator_1.Length)(1, 10, { message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_PASSWORD_LENGTH_ERROR }),
    __metadata("design:type", String)
], SignupPayload.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_IS_MISSING }),
    (0, class_validator_1.IsEmail)(undefined, { message: api_1.ApiCodeResponse.SIGNUP_PAYLOAD_MAIL_INVALID }),
    __metadata("design:type", String)
], SignupPayload.prototype, "mail", void 0);
//# sourceMappingURL=signup.payload.js.map