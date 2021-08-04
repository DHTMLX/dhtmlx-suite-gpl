import { IDataDriver } from "../types";
import { IAnyObj } from "../../../ts-common/types";
export declare class JsonDriver implements IDataDriver {
    toJsonArray(data: any): any[];
    serialize(data: IAnyObj[]): IAnyObj[];
    getFields(row: any): {
        [key: string]: any;
    };
    getRows(data: string): any[];
}
