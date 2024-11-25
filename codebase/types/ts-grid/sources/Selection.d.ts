import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
import { ICell, IGrid, IRow, ICol, IProGrid } from "./types";
import { Id } from "../../ts-common/types";
export interface ISelectionConfig {
    disabled?: boolean;
}
export interface ISelection {
    config?: ISelectionConfig;
    setCell(rowId?: IRow | Id, colId?: ICol | Id, ctrlUp?: boolean, shiftUp?: boolean): void;
    getCell(): ICell | void;
    getCells(): ICell[];
    removeCell(rowId?: Id, colId?: Id): void;
    disable(): void;
    enable(): void;
    toHTML(): VNode | VNode[];
}
export declare enum GridSelectionEvents {
    beforeUnSelect = "beforeUnSelect",
    afterUnSelect = "afterUnSelect",
    beforeSelect = "beforeSelect",
    afterSelect = "afterSelect"
}
export interface IGridSelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [GridSelectionEvents.afterSelect]: (row: IRow, col: ICol) => void;
    [GridSelectionEvents.afterUnSelect]: (row: IRow, col: ICol) => void;
    [GridSelectionEvents.beforeSelect]: (row: IRow, col: ICol) => boolean | void;
    [GridSelectionEvents.beforeUnSelect]: (row: IRow, col: ICol) => boolean | void;
}
export declare class Selection implements ISelection {
    events: IEventSystem<GridSelectionEvents, IGridSelectionEventsHandlersMap>;
    config: ISelectionConfig;
    private _grid;
    private _gridId;
    private _selectedCell;
    private _selectedCells;
    private _type;
    private _multiselection;
    constructor(grid: IGrid | IProGrid, config?: ISelectionConfig, events?: IEventSystem<any>, gridId?: Id);
    setCell(row?: IRow | Id, col?: ICol | Id, ctrlUp?: boolean, shiftUp?: boolean): void;
    removeCell(rowId?: Id, colId?: Id): void;
    getCell(): ICell | void;
    getCells(): ICell[];
    disable(): void;
    enable(): void;
    toHTML(): VNode | VNode[];
    private _setCell;
    private _removeCell;
    private _removeCells;
    private _init;
    private _toHTML;
    private _isUnselected;
    private _findIndex;
    private _setBrowserFocus;
    private _getReverseScrollState;
}
