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
exports.ProductUpdatePayload = void 0;
const api_1 = require("../../../../common/api");
const class_validator_1 = require("class-validator");
const enum_1 = require("../enum");
const data_1 = require("../../../stock/data");
class ProductUpdatePayload {
}
exports.ProductUpdatePayload = ProductUpdatePayload;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_ID_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductUpdatePayload.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_TITLE_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductUpdatePayload.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_QUANTITY_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductUpdatePayload.prototype, "qunatity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_THICKNESS_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductUpdatePayload.prototype, "thickness", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_WIDTH_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductUpdatePayload.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_HEIGHT_MISSING_ERROR }),
    __metadata("design:type", Number)
], ProductUpdatePayload.prototype, "height", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_SHELVE_MISSING_ERROR }),
    __metadata("design:type", data_1.Shelve)
], ProductUpdatePayload.prototype, "shelve", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: api_1.ApiCodeResponse.PRODUCT_TYPE_MISSING_ERROR }),
    __metadata("design:type", String)
], ProductUpdatePayload.prototype, "type", void 0);
//# sourceMappingURL=product-update.payload.js.map