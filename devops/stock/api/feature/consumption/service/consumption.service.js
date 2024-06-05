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
var ConsumptionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumptionService = void 0;
const consumption_exception_1 = require("../consumption.exception");
const data_1 = require("../data");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const builder_pattern_1 = require("builder-pattern");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const ulid_1 = require("ulid");
let ConsumptionService = ConsumptionService_1 = class ConsumptionService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(ConsumptionService_1.name);
    }
    async list() {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new consumption_exception_1.ConsumptionListException();
        }
    }
    async detail(id) {
        const result = await this.repository.findOne({ where: { consumption_id: id } });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new consumption_exception_1.ConsumptionNotFoundException();
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new consumption_exception_1.ConsumptionDeleteException();
        }
    }
    async create(payload, user) {
        try {
            const newProduct = (0, builder_pattern_1.Builder)()
                .consumption_id((0, ulid_1.ulid)())
                .order_date(payload.order_date)
                .delivery_date(payload.delivery_date)
                .quantity(payload.quantity)
                .is_reserved(payload.is_reserved)
                .is_delivered(payload.is_delivered)
                .productName(payload.productName)
                .author(user)
                .product(payload.product)
                .shelve(payload.shelve)
                .shelve_reference(payload.shelve_reference)
                .build();
            return await this.repository.save(newProduct);
        }
        catch (e) {
            this.logger.error(e);
            throw new consumption_exception_1.ConsumptionCreateException();
        }
    }
    async findByShelveId(shelveId) {
        try {
            return await this.repository.find({ where: { shelve_reference: shelveId } });
        }
        catch (e) {
            throw new consumption_exception_1.ConsumptionListByShelveException();
        }
    }
    async findByProductById(productId) {
        try {
            return await this.repository.createQueryBuilder('consumption')
                .where('consumption.product.product_id = :productId', { productId })
                .getMany();
        }
        catch (e) {
            throw new consumption_exception_1.ConsumptionListByProductException();
        }
    }
    async findByCredential(credential) {
        let credential_id = credential.credential_id;
        try {
            return await this.repository.createQueryBuilder('consumption')
                .where('consumption.author.credential_id = :credential_id', { credential_id })
                .getMany();
        }
        catch (e) {
            throw new consumption_exception_1.ConsumptionListByCredentialException();
        }
    }
    async setForProduct(consumptions, product) {
        console.log('consumptions', consumptions);
        for (let consumption of consumptions) {
            consumption.product = product;
            consumption.consumption_id = consumption.consumption_id ? consumption.consumption_id : (0, ulid_1.ulid)();
            await this.repository.save(consumption);
        }
    }
};
exports.ConsumptionService = ConsumptionService;
exports.ConsumptionService = ConsumptionService = ConsumptionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_1.Consumption)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConsumptionService);
//# sourceMappingURL=consumption.service.js.map