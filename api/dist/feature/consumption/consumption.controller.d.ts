import { ConsumptionCreatePayload } from '@consumption/data';
import { Credential } from '@security/model';
export declare class ConsumptionController {
    create(payload: ConsumptionCreatePayload, user: Credential): void;
}
