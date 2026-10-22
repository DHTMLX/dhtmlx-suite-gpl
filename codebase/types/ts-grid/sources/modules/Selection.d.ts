import { VNode } from "../../../ts-common/dom";
import { IEventSystem } from "../../../ts-common/events";
import { ICell, IGrid, IRow, ICol, ISelectionType, IProGrid, ICellSource } from "../types";
import { Id } from "../../../ts-common/types";
export interface ISelectionConfig {
    disabled?: boolean;
    type?: ISelectionType;
    multiSelection?: boolean;
}
export interface ISelection extends ICellSource {
    config?: ISelectionConfig;
    getCells(): ICell[];
    removeCell(rowId?: Id, colId?: Id): void;
    disable(): void;
    enable(): void;
    isSelectedCell(row: IRow | Id, column?: ICol | Id): boolean;
    toHTML(): VNode | VNode[];
    /** @internal Rebuild the id-based cache after a row id has been changed */
    remapRows(): void;
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
    private _selectedSet;
    constructor(grid: IGrid | IProGrid, config?: ISelectionConfig, events?: IEventSystem<any>, gridId?: Id);
    setCell(row?: IRow | Id, col?: ICol | Id, ctrlUp?: boolean, shiftUp?: boolean): void;
    removeCell(rowId?: Id, colId?: Id): void;
    getCell(): ICell | void;
    getCells(): ICell[];
    disable(): void;
    enable(): void;
    isSelectedCell(row: IRow | Id, column?: ICol | Id): boolean;
    restoreFocus(): void;
    remapRows(): void;
    toHTML(): VNode | VNode[];
    private _setCell;
    private _removeCell;
    private _removeCells;
    private _init;
    private _toHTML;
    private _getSelectionLayout;
    private _isUnselected;
    private _findIndex;
    private _cellKey;
    private _setBrowserFocus;
}
