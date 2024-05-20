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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const model_1 = require("../../../../common/model");
const ulid_1 = require("ulid");
const cursus_entity_1 = require("./cursus.entity");
let Lesson = class Lesson extends model_1.BaseEntity {
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 26, default: () => `'${(0, ulid_1.ulid)()}'` }),
    __metadata("design:type", String)
], Lesson.prototype, "lesson_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 350, nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "learning_achievement", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Lesson.prototype, "session_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cursus_entity_1.Cursus, (ls) => ls.lessons, { cascade: false, eager: false }),
    __metadata("design:type", cursus_entity_1.Cursus)
], Lesson.prototype, "cursus", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)()
], Lesson);
//# sourceMappingURL=lesson.entity.js.map