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
exports.LessonUpdatePayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const api_1 = require("../../../../common/api");
const entity_1 = require("../entity");
class LessonUpdatePayload {
}
exports.LessonUpdatePayload = LessonUpdatePayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.LESSON_ID_LENGTH_ERROR }),
    (0, class_validator_1.Length)(26, 26, { message: api_1.ApiCodeResponse.LESSON_ID_MISSING_ERROR }),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "lesson_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.LESSON_TITLE_LENGTH_ERROR }),
    (0, class_validator_1.Length)(1, 50, { message: api_1.ApiCodeResponse.LESSON_TITLE_MISSING_ERROR }),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "file", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "learning_achievement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LessonUpdatePayload.prototype, "session_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.LESSON_CURSUS_MISSING_ERROR }),
    __metadata("design:type", entity_1.Cursus)
], LessonUpdatePayload.prototype, "cursus", void 0);
//# sourceMappingURL=lesson-update.payload.js.map