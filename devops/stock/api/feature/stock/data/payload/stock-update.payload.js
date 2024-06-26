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
exports.StockUpdatePayload = void 0;
const class_validator_1 = require("class-validator");
const api_1 = require("../../../../common/api");
const swagger_1 = require("@nestjs/swagger");
class StockUpdatePayload {
}
exports.StockUpdatePayload = StockUpdatePayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.STOCK_ID_MISSING_ERROR }),
    __metadata("design:type", String)
], StockUpdatePayload.prototype, "stock_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.STOCK_TITLE_IS_EMPTY }),
    __metadata("design:type", String)
], StockUpdatePayload.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.STOCK_WIDTH_IS_EMPTY }),
    __metadata("design:type", Number)
], StockUpdatePayload.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.STOCK_HEIGHT_IS_EMPTY }),
    __metadata("design:type", Number)
], StockUpdatePayload.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.STOCK_SCALE_IS_EMPTY }),
    __metadata("design:type", Number)
], StockUpdatePayload.prototype, "scale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], StockUpdatePayload.prototype, "shelves", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], StockUpdatePayload.prototype, "doors", void 0);
//# sourceMappingURL=stock-update.payload.js.map