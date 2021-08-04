import { IContainerConfig } from "../../../ts-common/core";
import { ICol, IColumnsWidth, IGridConfig, IRendererConfig, IRow, colType } from "./../types";
export declare function normalizeColumns({ columns, htmlEnable }: IGridConfig): void;
export declare function countColumns(config: IGridConfig, columns: ICol[]): number;
export declare function calculatePositions(width: number, height: number, scroll: any, conf: IRendererConfig, data: IRow[]): {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
};
export declare function getUnique(arr: any[], name: string, multiselection: boolean): any[];
export declare const getMaxRowHeight: (row: IRow, cols: ICol[], config?: IContainerConfig) => number;
export declare const getCalculatedRowHeight: (height: number, config?: {
    rowHeight: number;
    padding: number;
}) => number;
export declare const getTreeCellWidthOffset: (row: IRow) => number;
export declare const getMaxColsWidth: (rows: IRow[], cols: ICol[], config?: IContainerConfig, target?: import("../../../ts-grid").AdjustTargetType) => IColumnsWidth;
export declare function toFormat(value: any, type?: colType, format?: string): any;
