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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stock_service_1 = require("../service/stock.service");
const data_1 = require("../data");
const config_1 = require("../../../common/config");
const model_1 = require("../../../security/model");
let StockController = class StockController {
    constructor(service) {
        this.service = service;
    }
    create(user, payload) {
        return this.service.create(user, payload);
    }
    delete(id) {
        return this.service.delete(id);
    }
    detail(id) {
        return this.service.detail(id);
    }
    getAll(user) {
        return this.service.list(user);
    }
    update(payload) {
        return this.service.update(payload);
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, config_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.Credential, data_1.StockCreatePayload]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "detail", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, config_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_1.Credential]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_1.StockUpdatePayload]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "update", null);
exports.StockController = StockController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiTags)('Stock'),
    (0, common_1.Controller)('stock'),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map