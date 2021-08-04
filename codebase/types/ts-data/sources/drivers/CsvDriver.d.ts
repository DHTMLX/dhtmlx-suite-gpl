import { IDataDriver, ICsvDriverConfig } from "../types";
import { IAnyObj } from "../../../ts-common/types";
export interface ICsvDriver extends IDataDriver {
    getFields(data: string, headers?: string[]): any;
}
export declare class CsvDriver implements ICsvDriver {
    config: ICsvDriverConfig;
    constructor(config?: ICsvDriverConfig);
    getFields(row: string, headers?: string[]): {
        [key: string]: any;
    };
    getRows(data: string): string[];
    toJsonArray(data: string): any[];
    serialize(data: IAnyObj[], withoutHeader?: boolean): string;
    private _serialize;
}
