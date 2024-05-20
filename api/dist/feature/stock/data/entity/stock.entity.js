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
exports.Stock = void 0;
const data_1 = require("../../../product/data");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const data_2 = require("../../../../common/data");
const data_3 = require("../../../consumption/data");
let Stock = class Stock {
};
exports.Stock = Stock;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Stock.prototype, "stock_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Stock.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: false }),
    __metadata("design:type", String)
], Stock.prototype, "rack", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], Stock.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Stock.prototype, "nb_items_max", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Stock.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => data_3.Consumption, (c) => c.product, { cascade: false, eager: false }),
    __metadata("design:type", Array)
], Stock.prototype, "consumptions", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => data_1.Product, (p) => p.stock, { cascade: false, eager: true }),
    __metadata("design:type", data_1.Product)
], Stock.prototype, "product", void 0);
exports.Stock = Stock = __decorate([
    (0, typeorm_1.Entity)()
], Stock);
//# sourceMappingURL=stock.entity.js.map