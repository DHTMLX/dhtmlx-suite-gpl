import { ICell, ICol, IGrid, IRow, ISpan } from "./../types";
import { Id } from "../../../ts-common/types";
export declare function getWidth(columns: ICol[], colspan: number, index: number): number;
export declare function getHeight(rows: IRow[], span: ISpan): number;
export declare function getReducedColspan(columns: ICol[], colId: Id, colspan: number): number;
export declare function getReducedRowspan(initialRows: IRow[], currRows: IRow[], rowIndex: number, span: ISpan): number;
export declare function normalizeCell(cell: ICell, grid: IGrid): ICell;
