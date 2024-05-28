import { Payload, Section } from "@core";

export interface CredentialCreatePayload extends Payload{

    username: string;
    password: string;
    mail: string;
    isAdmin: boolean;
    section: Section;
    firstname: string;
    lastname: string;
}