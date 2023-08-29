import { DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap, IDataItem } from "../../ts-data";
import { GridEvents, IEventHandlersMap, IGrid, IGridConfig } from "../../ts-grid";
import { IEventSystem } from "../../ts-common/events";
import { Id } from "../../ts-common/types";
export interface ITreeGridConfig extends IGridConfig {
    rootParent?: Id;
    dragExpand?: boolean;
    collapsed?: boolean;
}
export interface ITreeGrid extends IGrid {
    events: IEventSystem<DataEvents | GridEvents | DragEvents | TreeGridEvents, IEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap & ITreeEventHandlersMap>;
    scrollTo(rowId: Id, colId: Id): void;
    expand(rowId: Id): void;
    collapse(rowId: Id): void;
    expandAll(): void;
    collapseAll(): void;
    groupBy(property: string | ((item: IDataItem) => string)): void;
    ungroup(): void;
}
export declare enum TreeGridEvents {
    beforeCollapse = "beforeCollapse",
    afterCollapse = "afterCollapse",
    beforeExpand = "beforeExpand",
    afterExpand = "afterExpand"
}
export interface ITreeEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [TreeGridEvents.beforeCollapse]: (rowId: Id) => boolean | void;
    [TreeGridEvents.afterCollapse]: (rowId: Id) => any;
    [TreeGridEvents.beforeExpand]: (rowId: Id) => boolean | void;
    [TreeGridEvents.afterExpand]: (rowId: Id) => any;
}
