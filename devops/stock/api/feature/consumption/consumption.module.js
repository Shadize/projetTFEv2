"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionModule = void 0;
const common_1 = require("@nestjs/common");
const consumption_controller_1 = require("./controller/consumption.controller");
const consumption_service_1 = require("./service/consumption.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_1 = require("./data");
let ConsumptionModule = class ConsumptionModule {
};
exports.ConsumptionModule = ConsumptionModule;
exports.ConsumptionModule = ConsumptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([data_1.Consumption])],
        controllers: [consumption_controller_1.ConsumptionController],
        exports: [consumption_service_1.ConsumptionService],
        providers: [consumption_service_1.ConsumptionService]
    })
], ConsumptionModule);
//# sourceMappingURL=consumption.module.js.map