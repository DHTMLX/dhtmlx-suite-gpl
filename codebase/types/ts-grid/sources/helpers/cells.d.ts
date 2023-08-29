import { ICol, IRow } from "./../types";
import { Id } from "../../../ts-common/types";
export declare function getWidth(columns: ICol[], colspan: number, index: number): number;
export declare function getHeight(dataRows: IRow[], rowspan: number, index: number): number;
export declare function getReducedColspan(columns: ICol[], colId: Id, colspan: number): number;
