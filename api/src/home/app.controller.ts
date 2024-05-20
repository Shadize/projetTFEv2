import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {TestException} from './app.exception';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {AppControllerHelloWorld} from './app.swagger';
import {Public} from '@common/config';

@ApiTags('Route de base')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }
    @Public()
    @ApiOperation(AppControllerHelloWorld)
    @Get()
    getHello(): string {
        throw new TestException();
    }
}
