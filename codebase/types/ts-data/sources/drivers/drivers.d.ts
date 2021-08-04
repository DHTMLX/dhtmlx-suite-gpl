import { JsonDriver } from "./JsonDriver";
import { CsvDriver } from "./CsvDriver";
import { XMLDriver } from "./XMLDriver";
export declare const dataDrivers: {
    json: typeof JsonDriver;
    csv: typeof CsvDriver;
};
export declare const dataDriversPro: {
    xml: typeof XMLDriver;
    json: typeof JsonDriver;
    csv: typeof CsvDriver;
};
