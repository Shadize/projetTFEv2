import { Credential } from '@security/model';
export declare class Token {
    token_id: string;
    token: string;
    refreshToken: string;
    credential: Credential;
}
