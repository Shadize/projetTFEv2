import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Credential, Token} from './model';
import {SecurityService} from './security.service';
import {TokenService} from './jwt';
import {SecurityController} from './security.controller';
import {ConfigKey, configManager} from '@common/config';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
    }), TypeOrmModule.forFeature([Credential, Token])],
    exports: [SecurityService],
    providers: [SecurityService, TokenService],
    controllers: [SecurityController]
})
export class SecurityModule {
}