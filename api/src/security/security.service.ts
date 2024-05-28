import {Injectable, Logger} from '@nestjs/common';
import {Credential, CredentialCreatePayload, CredentialUpdatePayload, RefreshTokenPayload, SignInPayload, SignupPayload, Token} from './model';
import {
    CredentialDeleteException,
    CredentialListException,
    MemberCreateException,
    SignupException,
    UserAlreadyExistException,
    UserNotFoundException
} from '@security/security.exception';
import {Builder} from 'builder-pattern';
import {InjectRepository} from '@nestjs/typeorm';
import {TokenService} from './jwt/token.service';
import {Repository} from 'typeorm';
import {isNil} from 'lodash';
import {comparePassword, encryptPassword} from '@security/utils';


@Injectable()
export class SecurityService {
    private readonly logger = new Logger(SecurityService.name);

    constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>,
                private readonly tokenService: TokenService) {
    }


    async detail(id: string): Promise<Credential> {

        const result = await this.repository.findOneBy({credential_id: id});
        if (!(isNil(result))) {
            return result;
        }
        throw new UserNotFoundException();
    }

    async signIn(payload: SignInPayload, isAdmin: boolean): Promise<Token | null> {
        let result =  await this.repository.findOneBy({username: payload.username});

        if ( await comparePassword(payload.password, result.password)) {
            return this.tokenService.getTokens(result);
        }
        throw new UserNotFoundException();
    }

    async signup(payload: SignupPayload): Promise<Token | null> {
        const result: Credential | null = await this.repository.findOneBy({username: payload.username});
        if (!isNil(result)) {
            throw new UserAlreadyExistException();
        }
        try {
            const encryptedPassword =  await encryptPassword(payload.password) ;
            await this.repository.save(Builder<Credential>()
                .username(payload.username)
                .password(encryptedPassword)
                .mail(payload.mail)
                .build());
            const signInPayload: SignInPayload = {
                ...payload
            } as SignInPayload;
            return this.signIn(signInPayload, false);
        } catch (e) {
            this.logger.error(e.message);
            throw new SignupException();
        }
    }

    async create(payload: CredentialCreatePayload): Promise<void>{
        const result: Credential | null = await this.repository.findOneBy({username: payload.username});
        if (!isNil(result)) {
            throw new UserAlreadyExistException();
        }
        try{
            const encryptedPassword =  await encryptPassword(payload.password) ;
            await this.repository.save(Builder <Credential>()
            .username(payload.username)
            .mail(payload.mail)
            .password(encryptedPassword)
            .isAdmin(payload.isAdmin)
            .active(true)
            .section(payload.section)
            .firstname(payload.firstname)
            .lastname(payload.lastname)
            .build());
            
        } catch(e){
            this.logger.error(e.message);
            throw new MemberCreateException();
        }
    }

    async refresh(payload: RefreshTokenPayload): Promise<Token | null> {
        return this.tokenService.refresh(payload);
    }

    async delete(id:string): Promise<void> {
        try {
            const detail = await this.detail(id);
            await this.tokenService.deleteFor(detail);
            await this.repository.remove(detail);
        } catch (e) {
            throw new CredentialDeleteException();
        }
    }

    async list(user: Credential): Promise<Credential[]>{
        try{
           
                return await this.repository.find(); 
            
        }catch(e){
            throw new CredentialListException();
        }

    }



    async update(payload: CredentialUpdatePayload): Promise<Credential>{
        const encryptedPassword =  await encryptPassword(payload.password) ;
        try{
            let detail : Credential = await this.detail(payload.credential_id);
            detail.username = payload.username;
            detail.mail = payload.mail;
            detail.password = encryptedPassword;
            detail.isAdmin = payload.isAdmin;
            detail.active = payload.active;
            detail.section = payload.section;
            detail.firstname = payload.firstname;
            detail.lastname = payload.lastname;

            const member = await this.repository.save(detail);
            return member;
        } catch(e){
            this.logger.error(e.message);
            throw new MemberCreateException();
        }
    }
}