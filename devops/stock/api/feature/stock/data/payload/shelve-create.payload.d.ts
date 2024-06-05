import { Stock } from '@stock/data';
export declare class ShelveCreatePayload {
    location: Stock;
    rack: string;
    floor: string;
    nb_items_max: number;
}
