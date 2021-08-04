import { GridEvents, ICol, ICoords, IRendererConfig, GridSystemEvents } from "../types";
declare type mouseEvents = GridEvents.cellClick | GridEvents.cellMouseOver | GridEvents.cellMouseDown | GridEvents.cellDblClick | GridEvents.cellRightClick;
declare type touchEvents = GridSystemEvents.cellTouchEnd | GridSystemEvents.cellTouchMove;
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
export declare function getSpans(config: IRendererConfig, frozen?: boolean): any[];
export declare function getShifts(conf: IRendererConfig): ICoords;
export {};
