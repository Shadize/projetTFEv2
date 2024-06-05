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
exports.Token = void 0;
const typeorm_1 = require("typeorm");
const model_1 = require("..");
const ulid_1 = require("ulid");
let Token = class Token {
};
exports.Token = Token;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Token.prototype, "token_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Token.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => model_1.Credential, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'credential_id' }),
    __metadata("design:type", model_1.Credential)
], Token.prototype, "credential", void 0);
exports.Token = Token = __decorate([
    (0, typeorm_1.Entity)()
], Token);
//# sourceMappingURL=token.entity.js.map