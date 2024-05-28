import { SecurityService } from './security.service';
import { Credential, CredentialCreatePayload, CredentialUpdatePayload, RefreshTokenPayload, SignInPayload, SignupPayload } from './model';
export declare class SecurityController {
    private readonly service;
    constructor(service: SecurityService);
    signIn(payload: SignInPayload): Promise<import("./model").Token>;
    adminSignIn(payload: SignInPayload): Promise<import("./model").Token>;
    signUp(payload: SignupPayload): Promise<import("./model").Token>;
    refresh(payload: RefreshTokenPayload): Promise<import("./model").Token>;
    me(user: Credential): Credential;
    detail(id: string): Promise<Credential>;
    delete(id: string): Promise<void>;
    list(user: Credential): Promise<Credential[]>;
    create(payload: CredentialCreatePayload): Promise<void>;
    update(payload: CredentialUpdatePayload): Promise<Credential>;
}
