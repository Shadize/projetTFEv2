import { Credential, RefreshTokenPayload, SignInPayload, SignupPayload, Token } from './model';
import { TokenService } from './jwt/token.service';
import { Repository } from 'typeorm';
export declare class SecurityService {
    private readonly repository;
    private readonly tokenService;
    private readonly logger;
    constructor(repository: Repository<Credential>, tokenService: TokenService);
    detail(id: string): Promise<Credential>;
    signIn(payload: SignInPayload, isAdmin: boolean): Promise<Token | null>;
    signup(payload: SignupPayload): Promise<Token | null>;
    refresh(payload: RefreshTokenPayload): Promise<Token | null>;
    delete(id: string): Promise<void>;
    list(user: Credential): Promise<Credential[]>;
}
