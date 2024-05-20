"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursusModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const model_1 = require("./model");
const cursus_service_1 = require("./service/cursus.service");
const lesson_service_1 = require("./service/lesson.service");
const cursus_controller_1 = require("./controller/cursus.controller");
const lesson_controller_1 = require("./controller/lesson.controller");
let CursusModule = class CursusModule {
};
exports.CursusModule = CursusModule;
exports.CursusModule = CursusModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([model_1.Cursus, model_1.Lesson])],
        providers: [cursus_service_1.CursusService, lesson_service_1.LessonService],
        controllers: [cursus_controller_1.CursusController, lesson_controller_1.LessonController],
    })
], CursusModule);
//# sourceMappingURL=cursus.module.js.map