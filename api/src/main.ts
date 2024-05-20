import {NestFactory} from '@nestjs/core';
import {AppModule} from './home';
import {ConfigKey, configManager, HttpExceptionFilter} from '@common/config';
import {swaggerConfiguration} from '@common/documentation';
import {Logger, ValidationError, ValidationPipe} from '@nestjs/common';
import {ApiInterceptor} from '@common/api/api.interceptor';
import {ValidationException} from '@common/api';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(configManager.getValue(ConfigKey.APP_BASE_URL));
    swaggerConfiguration.config(app);
    app.useGlobalInterceptors(new ApiInterceptor());
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => new ValidationException(validationErrors)
    }))
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    await app.listen(parseInt(configManager.getValue(ConfigKey.APP_PORT), 10));
}

bootstrap().then(() => {
    const logger = new Logger('Main Logger');
    logger.log('Server is started !!')
});
