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
exports.Cursus = void 0;
const model_1 = require("../../../../common/model");
const typeorm_1 = require("typeorm");
const ulid_1 = require("ulid");
const lesson_entity_1 = require("./lesson.entity");
let Cursus = class Cursus extends model_1.BaseEntity {
};
exports.Cursus = Cursus;
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Cursus.prototype, "cursus_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Cursus.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 350, nullable: true }),
    __metadata("design:type", String)
], Cursus.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, nullable: true }),
    __metadata("design:type", String)
], Cursus.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Cursus.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (ls) => ls.cursus, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Cursus.prototype, "lessons", void 0);
exports.Cursus = Cursus = __decorate([
    (0, typeorm_1.Entity)()
], Cursus);
//# sourceMappingURL=cursus.entity.js.map