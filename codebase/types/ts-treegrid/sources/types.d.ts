import { DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap } from "../../ts-data";
import { GridEvents, IEventHandlersMap, IExtendedGrid, IExtendedGridConfig } from "../../ts-grid";
import { IEventSystem } from "../../ts-common/events";
import { Id } from "../../ts-common/types";
import { TreeGridCollection } from "./TreeGridCollection";
export interface ITreeGridConfig extends IExtendedGridConfig {
    type?: "tree";
    rootParent?: Id;
    dragExpand?: boolean;
    collapsed?: boolean;
}
export interface ITreeGrid extends IExtendedGrid {
    events: IEventSystem<DataEvents | GridEvents | DragEvents, IEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap>;
    config: ITreeGridConfig;
    data: TreeGridCollection;
}
