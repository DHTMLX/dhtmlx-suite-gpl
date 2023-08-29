import { ICellCss, ICol, IGridConfig, IRow, ISpan } from "../types";
export declare function transpose(arr: any[][], transform?: any): any[][];
export declare function getStyleByClass(cssClass: string, container: HTMLElement, targetClass: string, def?: ICellCss): ICellCss;
export declare function removeHTMLTags(str: string): string;
export declare function isCssSupport(property: string, value: string): boolean;
export declare function isRowEmpty(row: IRow): boolean;
export declare function isSortable(config: IGridConfig, col: ICol): boolean;
export declare function isAutoWidth(config: IGridConfig, col?: ICol): boolean;
export declare function showTooltip({ node, value, htmlEnable }: {
    node: any;
    value: any;
    htmlEnable?: boolean;
}): void;
export declare function isContentTooltip(config: IGridConfig, col: ICol, cell: any, type: "footer" | "header"): boolean;
export declare function isTooltip(config: IGridConfig, element: ICol | ISpan): boolean;
export declare function isHtmlEnable(config: IGridConfig, col: ICol): boolean;
export declare function getTotalWidth(columns: ICol[]): number;
export declare function getTotalHeight(rows: IRow[]): number;
export declare function scrollFixedColsAndRows(e: WheelEvent): void;
