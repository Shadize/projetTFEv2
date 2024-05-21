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
exports.Consumption = void 0;
const data_1 = require("../../../product/data");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const model_1 = require("../../../../security/model");
const data_2 = require("..");
let Consumption = class Consumption {
};
exports.Consumption = Consumption;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Consumption.prototype, "consumption_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Consumption.prototype, "order_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Consumption.prototype, "delivery_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Consumption.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Consumption.prototype, "is_reserved", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Consumption.prototype, "is_delivered", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Consumption.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 'ACTIVE' }),
    __metadata("design:type", String)
], Consumption.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => data_1.Product, (p) => p.consumptions, { cascade: false, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id_fk', referencedColumnName: 'product_id' }),
    __metadata("design:type", data_1.Product)
], Consumption.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => model_1.Credential, (c) => c.consumptions, { cascade: false, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'credential_id_fk', referencedColumnName: 'credential_id' }),
    __metadata("design:type", model_1.Credential)
], Consumption.prototype, "author", void 0);
exports.Consumption = Consumption = __decorate([
    (0, typeorm_1.Entity)()
], Consumption);
//# sourceMappingURL=consumption.entity.js.map