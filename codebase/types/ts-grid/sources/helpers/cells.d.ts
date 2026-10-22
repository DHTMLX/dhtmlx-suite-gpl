import { ICell, ICellSource, ICellSourceHolder, ICol, IGrid, IRow, ISpan } from "./../types";
import { Id } from "../../../ts-common/types";
export declare function getWidth(columns: ICol[], colspan: number, index: number): number;
export declare function getSourceCellIndex(currentIdx: number, minIdx: number, count: number): number;
export declare function getSpanHeight(rows: IRow[], span: ISpan): number;
export declare function getReducedColspan(columns: ICol[], colId: Id, colspan: number): number;
export declare function getReducedRowspan(initialRows: IRow[], currRows: IRow[], rowIndex: number, span: ISpan): number;
/**
 * Returns the module that owns the active cell position.
 * @param holder - the grid, or the renderer config built from it
 * @returns the module answering `getCell`, `setCell` and `restoreFocus`
 */
export declare function getCellSource(holder: ICellSourceHolder): ICellSource;
export declare function normalizeCell(cell: ICell, grid: IGrid): ICell;
export declare function clearCells(grid: any, cells: ICell[]): void;
export declare function formatValue(value: string, cell: ICell): any;
