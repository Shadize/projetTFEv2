import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configManager } from '@common/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@security/jwt';
import { SecurityModule } from '@security/security.module';
import { StockModule } from '@stock/stock.module';
import { ProductModule } from '@product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
    SecurityModule,
    StockModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD, useClass: JwtGuard
  }]
})
export class AppModule {
}
