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
exports.ProductCreatePayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../enum");
const class_validator_1 = require("class-validator");
const api_1 = require("../../../../common/api");
const data_1 = require("../../../stock/data");
class ProductCreatePayload {
}
exports.ProductCreatePayload = ProductCreatePayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_TITLE_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductCreatePayload.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductCreatePayload.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductCreatePayload.prototype, "materials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductCreatePayload.prototype, "treatment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_THICKNESS_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductCreatePayload.prototype, "thickness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_WIDTH_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductCreatePayload.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_HEIGHT_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductCreatePayload.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductCreatePayload.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_SHELVE_MISSING_ERROR }),
    __metadata("design:type", data_1.Shelve)
], ProductCreatePayload.prototype, "shelve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_TYPE_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductCreatePayload.prototype, "type", void 0);
//# sourceMappingURL=product-create.payload.js.map