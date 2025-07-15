import { IEventSystem } from "../../../ts-common/events";
import { ICell } from "../types";
export declare enum ClipboardEvents {
    beforeCopy = "beforeCopy",
    afterCopy = "afterCopy",
    copyError = "copyError",
    beforePaste = "beforePaste",
    afterPaste = "afterPaste",
    pasteError = "pasteError"
}
export interface IClipboardEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [ClipboardEvents.beforeCopy]: (isCut: boolean) => boolean | void;
    [ClipboardEvents.afterCopy]: (isCut: boolean) => void;
    [ClipboardEvents.copyError]: (error: string) => void;
    [ClipboardEvents.beforePaste]: () => boolean | void;
    [ClipboardEvents.afterPaste]: () => void;
    [ClipboardEvents.pasteError]: (error: string) => void;
}
export interface IClipboardConfig {
    copyModifier?: (value: any, cell: ICell, cut: boolean) => string;
    cutModifier?: (value: any, cell: ICell) => string;
    pasteModifier?: (value: any, cell: ICell) => any;
}
export interface IClipboard {
    config: IClipboardConfig;
    events: IEventSystem<ClipboardEvents, IClipboardEventsHandlersMap>;
    copy(event?: ClipboardEvent): void;
    paste(event?: ClipboardEvent): void;
    cut(event?: ClipboardEvent): void;
    /**
     * @private
     * This method destroys the module
     */
    destructor(): void;
}
export declare class Clipboard implements IClipboard {
    config: IClipboardConfig;
    events: IEventSystem<ClipboardEvents, IClipboardEventsHandlersMap>;
    private _grid;
    private _handler;
    constructor(grid: any);
    copy(event?: ClipboardEvent): void;
    cut(event?: ClipboardEvent): void;
    paste(event?: ClipboardEvent): void;
    destructor(): void;
    private _prepareClipboardData;
    private _initHandlers;
    private _isFocused;
    private _getNextId;
    private _processPaste;
    private _clearCells;
    private _setFocus;
    private _paint;
}
