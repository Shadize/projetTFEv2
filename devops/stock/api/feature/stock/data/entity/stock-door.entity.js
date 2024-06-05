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
exports.StockDoor = void 0;
const enum_1 = require("../enum");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const data_1 = require("..");
let StockDoor = class StockDoor {
};
exports.StockDoor = StockDoor;
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], StockDoor.prototype, "stock_door_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: enum_1.StockDoorPosition.TOP.toString() }),
    __metadata("design:type", String)
], StockDoor.prototype, "wall", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], StockDoor.prototype, "startX", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], StockDoor.prototype, "startY", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], StockDoor.prototype, "endX", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], StockDoor.prototype, "endY", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: enum_1.StockDoorType.HORIZONTAL.toString() }),
    __metadata("design:type", String)
], StockDoor.prototype, "style", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: enum_1.StockDoorType.HORIZONTAL }),
    __metadata("design:type", String)
], StockDoor.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => data_1.Stock, (s) => s.shelves, { cascade: false, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'stock_id_fk', referencedColumnName: 'stock_id' }),
    __metadata("design:type", data_1.Stock)
], StockDoor.prototype, "location", void 0);
exports.StockDoor = StockDoor = __decorate([
    (0, typeorm_1.Entity)()
], StockDoor);
//# sourceMappingURL=stock-door.entity.js.map