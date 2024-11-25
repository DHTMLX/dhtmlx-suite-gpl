import { GridEvents, GridSystemEvents, ICol, ICoords, IGridConfig, IRendererConfig, ISpan, Split } from "../types";
import { IDataCollection } from "../../../ts-data";
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
export declare function getTreeCell(content: any, row: any, col: ICol, conf: IRendererConfig): any;
export declare function getCells(conf: IRendererConfig): any[];
export declare function getSpans(config: IRendererConfig, mode?: Split): any[];
export declare function getShifts(conf: IRendererConfig): ICoords;
export declare function normalizeSpan(span: ISpan, config: IGridConfig, data: IDataCollection): {
    $renderFrom: any[];
    $rowsVisibility: number[];
    $colsVisibility: number[];
    row: import("../../../ts-common/types").Id;
    column: import("../../../ts-common/types").Id;
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
