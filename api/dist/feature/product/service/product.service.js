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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const data_1 = require("../data");
const product_exception_1 = require("../product.exception");
const stock_exception_1 = require("../../stock/stock.exception");
const builder_pattern_1 = require("builder-pattern");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const ulid_1 = require("ulid");
const service_1 = require("../../stock/service");
let ProductService = class ProductService {
    constructor(shelveService, repository) {
        this.shelveService = shelveService;
        this.repository = repository;
    }
    async list() {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new product_exception_1.ProductListException();
        }
    }
    async detail(id) {
        const result = await this.repository.findOne({ where: { product_id: id } });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new product_exception_1.ProductNotFoundException();
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new product_exception_1.ProductDeleteException();
        }
    }
    async create(payload) {
        try {
            const newProduct = (0, builder_pattern_1.Builder)()
                .product_id((0, ulid_1.ulid)())
                .title(payload.title)
                .materials(payload.materials)
                .treatment(payload.treatment)
                .thickness(payload.thickness)
                .width(payload.width)
                .height(payload.height)
                .shelve(payload.shelve)
                .price(payload.price)
                .type(payload.type)
                .build();
            const product = await this.repository.save(newProduct);
            return product;
        }
        catch (e) {
            throw new product_exception_1.ProductCreateException();
        }
    }
    async update(payload) {
        try {
            let detail = await this.detail(payload.product_id);
            detail.title = payload.title;
            detail.quantity = payload.quantity;
            detail.materials = payload.materials;
            detail.treatment = payload.treatment;
            detail.thickness = payload.thickness;
            detail.width = payload.width;
            detail.height = payload.height;
            detail.price = payload.price;
            detail.type = payload.type;
            detail.shelve = payload.shelve;
            const product = await this.repository.save(detail);
            return product;
        }
        catch (e) {
            throw new stock_exception_1.StockUpdateException();
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(data_1.Product)),
    __metadata("design:paramtypes", [service_1.ShelveService, typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map