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
var StockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const data_1 = require("../data");
const lodash_1 = require("lodash");
const stock_exception_1 = require("../stock.exception");
const builder_pattern_1 = require("builder-pattern");
const ulid_1 = require("ulid");
const shelve_service_1 = require("./shelve.service");
const stock_door_service_1 = require("./stock-door.service");
let StockService = StockService_1 = class StockService {
    constructor(repository, shelveService, doorService) {
        this.repository = repository;
        this.shelveService = shelveService;
        this.doorService = doorService;
        this.logger = new common_1.Logger(StockService_1.name);
    }
    async list(user) {
        try {
            if ((0, lodash_1.isNil)(user.section)) {
                return await this.repository.find();
            }
            return await this.repository.find({ where: { section: user.section } });
        }
        catch (e) {
            throw new stock_exception_1.StockListException();
        }
    }
    async detail(id) {
        const result = await this.repository.findOne({ where: { stock_id: id }, relations: { shelves: true } });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new stock_exception_1.StockNotFoundException();
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.shelveService.deleteForStock(detail);
            await this.doorService.deleteForStock(detail);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new stock_exception_1.StockDeleteException();
        }
    }
    async create(user, payload) {
        try {
            console.log(user);
            const newStock = (0, builder_pattern_1.Builder)()
                .stock_id((0, ulid_1.ulid)())
                .section(user.section)
                .width(payload.width)
                .height(payload.height)
                .title(payload.title)
                .scale(payload.scale)
                .build();
            const stock = await this.repository.save(newStock);
            await this.shelveService.setStockShelve(stock, payload.shelves);
            await this.doorService.setStockDoor(stock, payload.doors);
            return await this.detail(stock.stock_id);
        }
        catch (e) {
            this.logger.error(e);
            throw new stock_exception_1.StockCreateException();
        }
    }
    async update(payload) {
        try {
            let detail = await this.detail(payload.stock_id);
            detail.title = payload.title;
            await this.repository.save(detail);
            await this.shelveService.setStockShelve(detail, payload.shelves);
            await this.doorService.setStockDoor(detail, payload.doors);
            return await this.detail(payload.stock_id);
        }
        catch (e) {
            this.logger.error(e);
            throw new stock_exception_1.StockUpdateException();
        }
    }
};
exports.StockService = StockService;
exports.StockService = StockService = StockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_1.Stock)),
    __metadata("design:paramtypes", [typeorm_2.Repository, shelve_service_1.ShelveService, stock_door_service_1.StockDoorService])
], StockService);
//# sourceMappingURL=stock.service.js.map