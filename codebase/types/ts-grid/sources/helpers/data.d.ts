import { IContainerConfig } from "../../../ts-common/core";
import { ICol, IColumnsWidth, IGridConfig, IRow, AdjustTargetType, TOption, IScrollState, IRange, ISizes } from "./../types";
export declare function getTotalRowHeight(row: IRow): number;
export declare function normalizeArray(obj: any, name: string): void;
export declare function measureTextHeight({ text, width, lineHeight, font, htmlEnable, }: {
    text?: string;
    width?: number;
    lineHeight?: number;
    font?: string;
    htmlEnable?: boolean;
}): number;
export declare function countColumns(config: IGridConfig, columns: ICol[]): number;
export declare function calculateVisibleRange(viewPortSize: ISizes, scroll: IScrollState, config: IGridConfig, data: IRow[]): IRange;
export declare function getUnique(arr: any[], name: string, multiselection: boolean): any[];
export declare const getMaxRowHeight: (row: IRow, cols: ICol[], config?: IContainerConfig) => number;
export declare const getCalculatedRowHeight: (height: number, config?: {
    rowHeight: number;
    verticalOffset?: number;
}) => number;
export declare const getTreeCellWidthOffset: (row: IRow, toArrow?: boolean) => number;
export declare const getMaxColsWidth: (rows: IRow[], cols: ICol[], config: IContainerConfig, target: AdjustTargetType) => IColumnsWidth;
export declare function applyPattern(value: string | number | boolean, col: ICol): string | number | boolean;
export declare function getEditorOptions(col: ICol, row?: IRow): TOption[];
export declare function getValueForNumberColumn(col: ICol, value: any): any;
export declare function getEditorValue(value: any, options: TOption[]): any;
