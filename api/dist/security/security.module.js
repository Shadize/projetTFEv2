"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("./model");
const security_service_1 = require("./security.service");
const jwt_1 = require("./jwt");
const security_controller_1 = require("./security.controller");
const config_1 = require("../common/config");
const jwt_2 = require("@nestjs/jwt");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_2.JwtModule.register({
                global: true,
                secret: config_1.configManager.getValue(config_1.ConfigKey.JWT_TOKEN_SECRET),
                signOptions: { expiresIn: config_1.configManager.getValue(config_1.ConfigKey.JWT_TOKEN_EXPIRE_IN) },
            }), typeorm_1.TypeOrmModule.forFeature([model_1.Credential, model_1.Token])],
        exports: [security_service_1.SecurityService],
        providers: [security_service_1.SecurityService, jwt_1.TokenService],
        controllers: [security_controller_1.SecurityController]
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map