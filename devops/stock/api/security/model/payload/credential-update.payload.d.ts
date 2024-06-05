import { Section } from '@common/data';
export declare class CredentialUpdatePayload {
    credential_id: string;
    username: string;
    password: string;
    mail: string;
    isAdmin: boolean;
    active: boolean;
    section: Section;
    firstname: string;
    lastname: string;
}
