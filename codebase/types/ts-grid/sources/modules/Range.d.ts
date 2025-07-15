import { IEventSystem } from "../../../ts-common/events";
import { Id } from "../../../ts-common/types";
import { ICell, IExtendedGrid, IProGrid } from "../types";
export interface IRangeSelection {
    xStart?: Id;
    xEnd?: Id;
    yStart?: Id;
    yEnd?: Id;
}
export interface IRangeCell {
    x?: Id;
    y?: Id;
}
export interface IRangeConfig {
    disabled?: boolean;
}
export declare enum RangeEvents {
    beforeSetRange = "beforeSetRange",
    afterSetRange = "afterSetRange",
    beforeResetRange = "beforeResetRange",
    afterResetRange = "afterResetRange"
}
export interface IRangeEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [RangeEvents.beforeSetRange]: (range: IRangeSelection) => boolean | void;
    [RangeEvents.afterSetRange]: (range: IRangeSelection) => void;
    [RangeEvents.beforeResetRange]: (range: IRangeSelection) => boolean | void;
    [RangeEvents.afterResetRange]: (range: IRangeSelection) => void;
}
export interface IRange {
    config: IRangeConfig;
    events: IEventSystem<RangeEvents, IRangeEventsHandlersMap>;
    setRange(range: IRangeSelection, join?: boolean): boolean;
    resetRange(): boolean;
    getRange(): IRangeSelection | null;
    getRangedCells(): ICell[];
    isRanged(cell: IRangeCell): boolean;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
    /**
     * @private
     * This method destroys the module
     */
    destructor(): void;
}
export declare class Range implements IRange {
    config: IRangeConfig;
    events: IEventSystem<RangeEvents, IRangeEventsHandlersMap>;
    private _grid;
    private _range;
    private _cells;
    private _xSet;
    private _ySet;
    private _disabled;
    constructor(grid: IExtendedGrid | IProGrid);
    setRange(range: IRangeSelection, join?: boolean): boolean;
    resetRange(): boolean;
    getRange(): IRangeSelection | null;
    getRangedCells(): ICell[];
    isRanged(cell: IRangeCell): boolean;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
    destructor(): void;
    private _resetRange;
    private _getColumnRange;
    private _getRowRange;
    private _isAllowedRange;
    private _initHandlers;
}
