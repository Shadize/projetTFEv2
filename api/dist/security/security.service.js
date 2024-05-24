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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const model_1 = require("./model");
const security_exception_1 = require("./security.exception");
const builder_pattern_1 = require("builder-pattern");
const typeorm_1 = require("@nestjs/typeorm");
const token_service_1 = require("./jwt/token.service");
const typeorm_2 = require("typeorm");
const lodash_1 = require("lodash");
const utils_1 = require("./utils");
let SecurityService = SecurityService_1 = class SecurityService {
    constructor(repository, tokenService) {
        this.repository = repository;
        this.tokenService = tokenService;
        this.logger = new common_1.Logger(SecurityService_1.name);
    }
    async detail(id) {
        const result = await this.repository.findOneBy({ credential_id: id });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new security_exception_1.UserNotFoundException();
    }
    async signIn(payload, isAdmin) {
        let result = await this.repository.findOneBy({ username: payload.username });
        if (await (0, utils_1.comparePassword)(payload.password, result.password)) {
            return this.tokenService.getTokens(result);
        }
        throw new security_exception_1.UserNotFoundException();
    }
    async signup(payload) {
        const result = await this.repository.findOneBy({ username: payload.username });
        if (!(0, lodash_1.isNil)(result)) {
            throw new security_exception_1.UserAlreadyExistException();
        }
        try {
            const encryptedPassword = await (0, utils_1.encryptPassword)(payload.password);
            await this.repository.save((0, builder_pattern_1.Builder)()
                .username(payload.username)
                .password(encryptedPassword)
                .mail(payload.mail)
                .build());
            const signInPayload = {
                ...payload
            };
            return this.signIn(signInPayload, false);
        }
        catch (e) {
            this.logger.error(e.message);
            throw new security_exception_1.SignupException();
        }
    }
    async refresh(payload) {
        return this.tokenService.refresh(payload);
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new security_exception_1.CredentialDeleteException();
        }
    }
    async list(user) {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new security_exception_1.CredentialListException();
        }
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = SecurityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Credential)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        token_service_1.TokenService])
], SecurityService);
//# sourceMappingURL=security.service.js.map