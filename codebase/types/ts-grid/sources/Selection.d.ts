import { IEventSystem } from "../../ts-common/events";
import { ICell, IGrid, ISelection, IRow, ICol, ISelectionType, GridSelectionEvents, IGridSelectionEventsHandlersMap, ISelectionConfig } from "./types";
import { Id } from "../../ts-common/types";
export declare class Selection implements ISelection {
    events: IEventSystem<GridSelectionEvents, IGridSelectionEventsHandlersMap>;
    config: ISelectionConfig;
    protected _grid: IGrid;
    protected _selectedCell: ICell;
    protected _oldSelectedCell: ICell;
    protected _selectedCells: ICell[];
    protected _type: ISelectionType;
    protected _multiselection: boolean;
    constructor(grid: IGrid, config?: ISelectionConfig, events?: IEventSystem<any>);
    setCell(row?: any, col?: any, ctrlUp?: boolean, shiftUp?: boolean): void;
    getCell(): ICell;
    getCells(): ICell[];
    toHTML(): any;
    disable(): void;
    enable(): void;
    removeCell(rowId?: Id, colId?: Id): void;
    protected _removeCell(row: any, col: any): void;
    protected _removeCells(): void;
    protected _init(): void;
    protected _toHTML(row: IRow, column: ICol, last?: boolean): any;
    protected _isUnselected(): boolean;
    protected _findIndex(cell?: ICell): number;
    protected _setBrowserFocus(): void;
}
