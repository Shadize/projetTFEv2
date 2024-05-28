import { Payload, Section } from "@core";

export interface CredentialUpdatePayload extends Payload{
    credential_id: string;
    username: string;
    password: string;
    mail: string;
    isAdmin: boolean;
    section: Section;
    firstname: string;
    lastname: string;
}