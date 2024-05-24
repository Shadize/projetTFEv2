import { SecurityService } from './security.service';
import { Credential, RefreshTokenPayload, SignInPayload, SignupPayload } from './model';
export declare class SecurityController {
    private readonly service;
    constructor(service: SecurityService);
    signIn(payload: SignInPayload): Promise<import("./model").Token>;
    adminSignIn(payload: SignInPayload): Promise<import("./model").Token>;
    signUp(payload: SignupPayload): Promise<import("./model").Token>;
    refresh(payload: RefreshTokenPayload): Promise<import("./model").Token>;
    me(user: Credential): Credential;
    delete(id: string): Promise<void>;
    list(user: Credential): Promise<Credential[]>;
}
