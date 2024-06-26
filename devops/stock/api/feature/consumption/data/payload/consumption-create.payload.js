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
exports.ConsumptionCreatePayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const data_1 = require("../../../product/data");
const class_validator_1 = require("class-validator");
const api_1 = require("../../../../common/api");
class ConsumptionCreatePayload {
}
exports.ConsumptionCreatePayload = ConsumptionCreatePayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ConsumptionCreatePayload.prototype, "order_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ConsumptionCreatePayload.prototype, "delivery_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ConsumptionCreatePayload.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ConsumptionCreatePayload.prototype, "is_reserved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ConsumptionCreatePayload.prototype, "is_delivered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumptionCreatePayload.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.CONSUMPTION_IS_MISSING }),
    __metadata("design:type", String)
], ConsumptionCreatePayload.prototype, "shelve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.CONSUMPTION_IS_MISSING }),
    __metadata("design:type", String)
], ConsumptionCreatePayload.prototype, "shelve_reference", void 0);
//# sourceMappingURL=consumption-create.payload.js.map