import { Consumption } from '../../../feature/consumption/data';
export declare class Credential {
    credential_id: string;
    username: string;
    password: string;
    mail: string;
    isAdmin: boolean;
    active: boolean;
    section: string;
    firstname: string;
    lastname: string;
    created: Date;
    updated: Date;
    consumptions: Consumption[];
}
