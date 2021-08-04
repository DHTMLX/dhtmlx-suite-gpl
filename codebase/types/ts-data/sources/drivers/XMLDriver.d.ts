import { IDataDriver } from "../types";
import { IAnyObj } from "../../../ts-common/types";
export declare class XMLDriver implements IDataDriver {
    toJsonArray(data: any): any[];
    toJsonObject(data: string): {
        [key: string]: any;
    };
    serialize(data: IAnyObj[]): string;
    getFields(row: any): {
        [key: string]: any;
    };
    getRows(data: Document | string): any[];
    private _getRows;
    private _fromString;
    private _nodeToJS;
    private _toType;
    private _haveAttrs;
}
