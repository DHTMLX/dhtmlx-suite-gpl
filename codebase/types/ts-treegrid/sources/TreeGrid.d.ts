import { GridEvents, IEventHandlersMap, ExtendedGrid, ICellRect, IColumnsWidth, ISpan, IAdjustColumns } from "../../ts-grid";
import { IEventSystem } from "../../ts-common/events";
import { DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap } from "../../ts-data";
import { TreeGridCollection } from "./TreeGridCollection";
import { ITreeEventHandlersMap, ITreeGrid, ITreeGridConfig, TreeGridEvents } from "./types";
import { Id } from "../../ts-common/types";
export declare class TreeGrid extends ExtendedGrid implements ITreeGrid {
    config: ITreeGridConfig;
    data: TreeGridCollection;
    events: IEventSystem<DataEvents | GridEvents | DragEvents | TreeGridEvents, IEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap & ITreeEventHandlersMap>;
    constructor(container: HTMLElement | string | null, config: ITreeGridConfig);
    expand(rowId: Id): void;
    collapse(rowId: Id): void;
    expandAll(): void;
    collapseAll(): void;
    showRow(rowId: Id): void;
    hideRow(rowId: Id): void;
    getCellRect(rowId: Id, colId: Id): ICellRect;
    getSpan(rowId: Id, colId: Id): ISpan;
    protected _adjustColumnsWidth({ rows, cols, totalCols, adjust, }: IAdjustColumns): IColumnsWidth;
    protected _createCollection(prep: (data: any[]) => any[]): void;
    protected _getRowIndex(rowId: Id): number;
    protected _applyLocalFilter(beforePrepareData?: boolean): void;
    protected _setEventHandlers(): void;
    private _serialize;
    private _expand;
    private _collapse;
}
