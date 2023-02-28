import { Id } from "../../../ts-common/types";
import { ICol, IRow, ISpan } from "./../types";
export declare function getWidth(columns: ICol[], colspan: number, index: number): number;
export declare function getHeight(dataRows: IRow[], rowspan: number, index: number): number;
export declare function getSpan(rowId: Id, colId: Id, conf: any): ISpan;
