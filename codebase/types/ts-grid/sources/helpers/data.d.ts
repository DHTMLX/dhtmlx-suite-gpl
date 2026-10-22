import { IContainerConfig } from "../../../ts-common/core";
import { ICol, IColumnsWidth, IGridConfig, IRow, AdjustTargetType, TOption, IOption, IScrollState, IVisibleRange, ISizes, TContentFilter, TFilterOptions, TFixedRowHeight } from "./../types";
import { Id } from "../../../ts-common/types";
export declare function getTotalRowHeight(row: IRow): number;
export declare function rowsHeight(config: IGridConfig, rows: IRow[], from: number, to: number): number;
export declare function colsWidth(config: IGridConfig, cols: ICol[], from: number, to: number): number;
export declare function normalizeArray(obj: any, name: string): void;
/**
 * Resolves the height of a single header/footer level from the headerRowHeight/footerRowHeight value.
 * An array form describes the levels individually, a plain number applies to every level.
 * @param value - the headerRowHeight/footerRowHeight config value
 * @param index - the zero-based header/footer level index
 * @returns the level height and its auto-height state, where `auto: null` means
 * "the legacy mode, the headerAutoHeight/footerAutoHeight flag decides"
 */
export declare function resolveFixedRowHeight(value: TFixedRowHeight | undefined, index: number): {
    height: number;
    auto: boolean | null;
};
export declare function measureTextHeight({ text, width, lineHeight, font, htmlEnable, }: {
    text?: string;
    width?: number;
    lineHeight?: number;
    font?: string;
    htmlEnable?: boolean;
}): number;
export declare function countColumns(config: IGridConfig, columns: ICol[]): number;
export declare function calculateVisibleRange(viewPortSize: ISizes, scroll: IScrollState, config: IGridConfig, data: IRow[]): IVisibleRange;
export declare function getNormalizeFilterData(arr: any[], name: Id, multiselection: boolean, editorType: ICol["editorType"]): any[];
export declare const getMaxRowHeight: ({ cols, row, config, }: {
    row: IRow;
    cols: ICol[];
    config?: IContainerConfig;
}) => number;
export declare const getCalculatedRowHeight: (height: number, config?: {
    rowHeight: number;
    verticalOffset?: number;
}) => number;
export declare const getTreeCellWidthOffset: (row: IRow, toArrow?: boolean) => number;
export declare const getMaxColsWidth: (rows: IRow[], cols: ICol[], config: IContainerConfig, target: AdjustTargetType) => IColumnsWidth;
export declare function applyPattern(value: string | number | boolean, col: ICol): string | number | boolean;
export declare function getEditorOptions(col: ICol, row?: IRow): TOption[];
export declare function normalizeOptions(options: any[]): IOption[];
export declare function getFilterOptions(col: ICol, content: TContentFilter): TFilterOptions;
export declare function resolveFilterOptions(col: ICol, content: TContentFilter, uniqueData?: any[]): IOption[];
export declare function getOptionValue(value: string, column: ICol): string;
export declare function getValueForNumberColumn(col: ICol, value: any): any;
export declare function getComboEditorValue(value: any, col: ICol, row: IRow): any;
export declare function getEditorValue(value: any, options: TOption[]): any;
export declare function getReverseScrollState(grid: any): {
    x: number;
    y: number;
};
export declare function getColumnHeaderText(col: ICol): string;
