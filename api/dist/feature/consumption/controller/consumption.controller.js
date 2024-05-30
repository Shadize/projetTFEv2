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
exports.ConsumptionController = void 0;
const common_1 = require("@nestjs/common");
const data_1 = require("../data");
const model_1 = require("../../../security/model");
const config_1 = require("../../../common/config");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
let ConsumptionController = class ConsumptionController {
    constructor(service) {
        this.service = service;
    }
    create(payload, user) {
        return this.service.create(payload);
    }
    delete(id) {
        return this.service.delete(id);
    }
    detail(id) {
        return this.service.detail(id);
    }
    getAll() {
        return this.service.list();
    }
    getByShelveId(shelveId) {
        return this.service.findByShelveId(shelveId);
    }
};
exports.ConsumptionController = ConsumptionController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, config_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [data_1.ConsumptionCreatePayload, model_1.Credential]),
    __metadata("design:returntype", void 0)
], ConsumptionController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsumptionController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('detail/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsumptionController.prototype, "detail", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConsumptionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('shelve/:shelveId'),
    __param(0, (0, common_1.Param)('shelveId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsumptionController.prototype, "getByShelveId", null);
exports.ConsumptionController = ConsumptionController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiTags)('Consumption'),
    (0, common_1.Controller)('consumption'),
    __metadata("design:paramtypes", [service_1.ConsumptionService])
], ConsumptionController);
//# sourceMappingURL=consumption.controller.js.map