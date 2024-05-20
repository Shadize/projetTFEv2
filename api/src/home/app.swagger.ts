import {ApiOperationOptions} from '@nestjs/swagger/dist/decorators/api-operation.decorator';

export const AppControllerHelloWorld: ApiOperationOptions = {
    summary: 'Hello world',
    description: 'Ma super description pour cette méthode'
}