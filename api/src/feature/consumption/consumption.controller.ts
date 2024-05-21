import { Body, Controller, Post } from '@nestjs/common';
import { ConsumptionCreatePayload } from '@consumption/data';
import { Credential } from '@security/model';
import { User } from '@common/config';

@Controller('consumption')
export class ConsumptionController {
  @Post('create')
  create(@Body() payload: ConsumptionCreatePayload, @User() user: Credential) {
    // return this.service.create(payload);
  }
}
