import { VNode } from "../../../ts-common/dom";
import { ICell, IExtendedGrid, IProGrid } from "../types";
import { IEventSystem } from "../../../ts-common/events";
export type DragDirection = "up" | "down" | "right" | "left";
export type HandleAxis = "x" | "y" | "xy";
export type RangeMode = "range" | "manual";
export declare enum BlockSelectionEvents {
    blockSelectionValidate = "blockSelectionValidate",
    blockSelectionStart = "blockSelectionStart",
    beforeBlockSelectionMove = "beforeBlockSelectionMove",
    afterBlockSelectionMove = "afterBlockSelectionMove",
    blockSelectionEnd = "blockSelectionEnd",
    beforeBlockSelectionApply = "beforeBlockSelectionApply",
    afterBlockSelectionApply = "afterBlockSelectionApply",
    beforeBlockHandleApply = "beforeBlockHandleApply",
    afterBlockHandleApply = "afterBlockHandleApply",
    blockHandleMouseDown = "blockHandleMouseDown"
}
export interface IBlockSelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [BlockSelectionEvents.blockSelectionValidate]: (validateCell: ICell, handle: boolean, event: MouseEvent | TouchEvent) => boolean | void;
    [BlockSelectionEvents.blockSelectionStart]: (startCell: ICell, endCell: ICell, handle: boolean, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.beforeBlockSelectionMove]: (startCell: ICell, nextCell: ICell, focusCell: ICell | null, dragDirection: DragDirection | null, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.afterBlockSelectionMove]: (startCell: ICell, endCell: ICell, focusCell: ICell | null, dragDirection: DragDirection | null, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.blockSelectionEnd]: (startCell: ICell, endCell: ICell, handle: boolean, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.beforeBlockSelectionApply]: (startCell: ICell, endCell: ICell, handle: boolean, event: MouseEvent | TouchEvent) => boolean | void;
    [BlockSelectionEvents.afterBlockSelectionApply]: (startCell: ICell, endCell: ICell, handle: boolean, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.beforeBlockHandleApply]: (startCell: ICell, endCell: ICell, dragDirection: DragDirection | null, event: MouseEvent | TouchEvent) => boolean | void;
    [BlockSelectionEvents.afterBlockHandleApply]: (startCell: ICell, endCell: ICell, dragDirection: DragDirection | null, event: MouseEvent | TouchEvent) => void;
    [BlockSelectionEvents.blockHandleMouseDown]: (event: MouseEvent | TouchEvent) => void;
}
export interface IHandleHandler {
    cell: ICell;
    array: ICell[];
    range: ICell[];
    dir: DragDirection;
    index: number;
    grid: IProGrid;
}
export interface IHandleHistory {
    prev: any;
    current: any;
}
export interface IHandleConfig {
    allowAxis?: HandleAxis;
    handler?: boolean | ((args: IHandleHandler) => IHandleHistory | void);
}
export interface IBlockSelectionConfig {
    disabled?: boolean;
    mode?: RangeMode;
    handle?: boolean | IHandleConfig;
    area?: boolean;
}
export interface IBlockSelection {
    config: IBlockSelectionConfig;
    events: IEventSystem<BlockSelectionEvents, IBlockSelectionEventsHandlersMap>;
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
    /**
     * @private
     * This method destroys the module
     */
    destructor(): void;
    /**
     * @private
     * This method is for internal use and should not be called directly
     */
    toHTML(): VNode | VNode[];
}
export declare class BlockSelection implements IBlockSelection {
    config: IBlockSelectionConfig;
    events: IEventSystem<BlockSelectionEvents, IBlockSelectionEventsHandlersMap>;
    private _grid;
    private _startCell;
    private _endCell;
    private _focusStartCell;
    private _focusEndCell;
    private _selectionBounds;
    private _startCellRect;
    private _endCellRect;
    private _focusCellRect;
    private _startPoint;
    private _dragDirection;
    private _disabled;
    private _isHandleActive;
    private _handlers;
    private readonly HANDLE_OFFSET;
    private readonly MOVE_THRESHOLD;
    constructor(grid: IProGrid | IExtendedGrid);
    enable(): void;
    disable(): void;
    isDisabled(): boolean;
    destructor(): void;
    toHTML(): VNode | null;
    private _getAreaNode;
    private _getStartCellNode;
    private _getHandleAreaNode;
    private _getHandleNode;
    private _initConfig;
    private _initHandlers;
    private _blockSelectionValidate;
    private _blockSelectionStart;
    private _blockSelectionMove;
    private _blockSelectionEnd;
    private _updateSelectionBounds;
    private _resetMoveState;
    private _applyAreaSelection;
    private _applyHandle;
    private _getDragDirection;
    private _calculateBounds;
    private _isCellFixed;
    private _getFixedItems;
    private _isColumnFixed;
    private _setHandlers;
    private _removeHandlers;
    private _getPageCoords;
    private _cellHandler;
    private _paint;
}
