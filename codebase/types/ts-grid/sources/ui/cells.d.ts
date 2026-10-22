import { GridEvents, GridSystemEvents, ICellState, ICoords, IGridConfig, IRendererConfig, ISpan, Split } from "../types";
import { IDataCollection } from "../../../ts-data";
import { Id } from "../../../ts-common/types";
type mouseEvents = GridEvents.cellClick | GridEvents.cellMouseOver | GridEvents.cellMouseDown | GridEvents.cellDblClick | GridEvents.cellRightClick;
type touchEvents = GridSystemEvents.cellTouchEnd | GridSystemEvents.cellTouchMove;
declare function handleMouse(rowStart: number, colStart: number, conf: IRendererConfig, type: mouseEvents & touchEvents, e: any): void;
export declare function getHandlers(row: number, column: number, conf: IRendererConfig): {
    onclick: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    onmouseover: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    onmousedown: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    ondblclick: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    oncontextmenu: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    ontouchstart: (number | GridEvents | IRendererConfig | typeof handleMouse)[];
    ontouchmove: (number | GridSystemEvents | IRendererConfig | typeof handleMouse)[];
    ontouchend: (number | GridSystemEvents | IRendererConfig | typeof handleMouse)[];
};
export interface ISpanExtent {
    column: Id;
    colspan: number;
    rowspan: number;
}
/** @internal the per-render-pass answer of {@link resolveCellState} */
export interface IResolvedCellState {
    /** the row and the column of the only cell that carries `tabindex="0"` */
    tabRow: Id;
    tabCol: Id;
    readonly: "true" | "false";
    /** the cells a host reports as read-only in an editable grid */
    readonlyCells: ICellState["readonlyCells"];
    /** whether `aria-selected` belongs on a cell at all — it does not in row selection mode */
    exposeSelected: boolean;
    isSelected: (rowId: Id, colId: Id) => boolean;
}
/**
 * Resolves everything the cell renderers need to know about selection, focus and editability,
 * once per render pass. This is the hottest path in the product — `getCells` runs per visible
 * cell and again for every frozen zone — so the per-cell work left afterwards is two identity
 * comparisons for the tabindex and one call for `aria-selected`.
 *
 * The state comes from `$cellState` when a host product supplies it, and from the grid's own
 * selection module otherwise.
 */
export declare function resolveCellState(conf: IRendererConfig): IResolvedCellState;
export declare function getCells(conf: IRendererConfig): any[];
export declare function getSpans(config: IRendererConfig, mode?: Split): any[];
export declare function getShifts(conf: IRendererConfig): ICoords;
export declare function normalizeSpan(span: ISpan, config: IGridConfig, data: IDataCollection): {
    $renderFrom: any[];
    $rowsVisibility: number[];
    $colsVisibility: number[];
    row: Id;
    column: Id;
    rowspan?: number;
    colspan?: number;
    text?: string | ((args: import("../types").ISummaryList) => string);
    css?: string;
    tooltip?: boolean | import("../types").IGridTooltipConfig;
    tooltipTemplate?: (content: {
        value: string;
    } & import("../types").ISummaryList, span: ISpan) => string | boolean;
};
export {};
