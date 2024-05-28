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
exports.Shelve = void 0;
const data_1 = require("../../../product/data");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const data_2 = require("../../../consumption/data");
const data_3 = require("..");
let Shelve = class Shelve {
};
exports.Shelve = Shelve;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Shelve.prototype, "shelve_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => data_3.Stock, (s) => s.shelves, { cascade: false, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'stock_id_fk', referencedColumnName: 'stock_id' }),
    __metadata("design:type", data_3.Stock)
], Shelve.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "rack", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Shelve.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Shelve.prototype, "nb_items_max", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => data_2.Consumption, (c) => c.product, { cascade: false, eager: false }),
    __metadata("design:type", Array)
], Shelve.prototype, "consumptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => data_1.Product, (p) => p.shelve, { nullable: true, cascade: false, eager: true }),
    __metadata("design:type", Array)
], Shelve.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Shelve.prototype, "startX", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Shelve.prototype, "startY", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Shelve.prototype, "endX", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Shelve.prototype, "endY", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "top", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "left", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Shelve.prototype, "height", void 0);
exports.Shelve = Shelve = __decorate([
    (0, typeorm_1.Entity)()
], Shelve);
//# sourceMappingURL=shelve.entity.js.map