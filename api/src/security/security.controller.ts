import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SecurityService} from './security.service';
import {Credential, CredentialCreatePayload, CredentialUpdatePayload, RefreshTokenPayload, SignInPayload, SignupPayload} from './model';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Public, User} from '@common/config';

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class SecurityController {
    constructor(private readonly service: SecurityService) {
    }

    @Public()
    @Post('signin')
    public signIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload, false);
    }

    @Public()
    @Post('admin-signin')
    public adminSignIn(@Body() payload: SignInPayload) {
        return this.service.signIn(payload, true);
    }

    @Public()
    @Post('signup')
    public signUp(@Body() payload: SignupPayload) {
        return this.service.signup(payload);
    }

    @Public()
    @Post('refresh')
    public refresh(@Body() payload: RefreshTokenPayload) {
        return this.service.refresh(payload);
    }

    @Get('me')
    public me(@User() user: Credential) {
        return user;
    }

    @Get('detail/:id')
    detail(@Param('id') id: string): Promise<Credential> {
      return this.service.detail(id);
    }

    @Delete('delete/:id')
    public delete(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get('list')
    public list(@User() user: Credential){
        return this.service.list(user);
    }

    @Post('create')
    public create(@Body() payload: CredentialCreatePayload) {
        return this.service.create(payload);
    }

    @Put('update')
    update(@Body() payload: CredentialUpdatePayload): Promise<Credential> {
      return this.service.update(payload);
    }
}