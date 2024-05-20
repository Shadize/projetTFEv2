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
exports.CursusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
const lodash_1 = require("lodash");
const model_1 = require("../model");
const ulid_1 = require("ulid");
const exception_1 = require("../exception");
let CursusService = class CursusService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(payload) {
        try {
            const newCursus = Object.assign(new model_1.Cursus(), (0, builder_pattern_1.Builder)()
                .cursus_id((0, ulid_1.ulid)())
                .title(payload.title)
                .description(payload.description)
                .code(payload.code)
                .contract(payload.contract)
                .build());
            return await this.repository.save(newCursus);
        }
        catch (e) {
            console.log(e);
            throw new exception_1.CursusCreateException();
        }
    }
    async delete(id) {
        try {
            const detail = await this.detail(id);
            await this.repository.remove(detail);
        }
        catch (e) {
            throw new exception_1.CursusDeleteException();
        }
    }
    async detail(id) {
        const result = await this.repository.findOne({ where: { cursus_id: id }, relations: { lessons: true } });
        if (!((0, lodash_1.isNil)(result))) {
            return result;
        }
        throw new exception_1.CursusNotFoundException();
    }
    async getAll() {
        try {
            return await this.repository.find();
        }
        catch (e) {
            throw new exception_1.CursusListException();
        }
    }
    async update(payload) {
        try {
            let detail = await this.detail(payload.cursus_id);
            detail.title = payload.title;
            detail.description = payload.description;
            detail.code = payload.code;
            detail.contract = payload.contract;
            return await this.repository.save(detail);
        }
        catch (e) {
            console.log(e);
            throw new exception_1.CursusUpdateException();
        }
    }
};
exports.CursusService = CursusService;
exports.CursusService = CursusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(model_1.Cursus)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CursusService);
//# sourceMappingURL=cursus.service.js.map