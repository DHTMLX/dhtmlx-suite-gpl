import { IGrid, IDirection, IProGrid, ICol, IRow } from "../types";
import { IRangeSelection } from "../modules/Range";
interface IMoveConf {
    grid: IGrid | IProGrid;
    dir: IDirection;
    rangedIndex: number;
    columns?: ICol[];
    event?: KeyboardEvent;
    toEnd?: boolean;
    shiftUp?: boolean;
}
export declare function move(config: IMoveConf): void;
export declare function applyRangeMove(proGrid: IProGrid, target: ICol | IRow, rangedCell: IRangeSelection, dir: IDirection, shiftUp: boolean): void;
export declare function getRangedIndex(grid: IGrid | IProGrid, direction: "up" | "down" | "left" | "right"): number;
export declare function getActiveCell(grid: IGrid | IProGrid, cellSelection: boolean): {
    row: IRow;
    column: ICol;
} | null;
export declare function walkVisibleRows(grid: IGrid | IProGrid, fromRowId: any, steps: number): any;
export declare function getNextVisibleRowId(grid: IGrid | IProGrid, currentRowId: any, direction: 1 | -1): import("../../../ts-common/types").Id;
export declare function isTreeColumn(grid: IGrid | IProGrid, colId: any): boolean;
export declare function navigateToCell(grid: any, cellSelection: boolean, rowId: any, colId: any): void;
export {};
