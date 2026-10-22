import { IGrid, ICol, IRow } from "../types";
export declare function isColumnEditable(column: ICol, config: {
    editable?: boolean;
}): boolean;
export declare function toggleBooleanCell(grid: IGrid, row: IRow, column: ICol): void;
export declare function startCellEdit(grid: IGrid, selected: {
    row: IRow;
    column: ICol;
}): void;
