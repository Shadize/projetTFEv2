"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const home_1 = require("./home");
const config_1 = require("./common/config");
const documentation_1 = require("./common/documentation");
const common_1 = require("@nestjs/common");
const api_interceptor_1 = require("./common/api/api.interceptor");
const api_1 = require("./common/api");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(home_1.AppModule);
    app.setGlobalPrefix(config_1.configManager.getValue(config_1.ConfigKey.APP_BASE_URL));
    documentation_1.swaggerConfiguration.config(app);
    app.useGlobalInterceptors(new api_interceptor_1.ApiInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => new api_1.ValidationException(validationErrors)
    }));
    app.useGlobalFilters(new config_1.HttpExceptionFilter());
    app.enableCors();
    await app.listen(parseInt(config_1.configManager.getValue(config_1.ConfigKey.APP_PORT), 10));
};
bootstrap().then(() => {
    const logger = new common_1.Logger('Main Logger');
    logger.log('Server is started !!');
});
//# sourceMappingURL=main.js.map