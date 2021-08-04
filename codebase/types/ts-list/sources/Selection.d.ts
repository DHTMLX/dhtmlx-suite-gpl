import { IEventSystem } from "../../ts-common/events";
import { SelectionEvents, ISelectionEventsHandlersMap, Id } from "../../ts-common/types";
import { DataCollection, DataEvents, IDataEventsHandlersMap, IDataItem } from "../../ts-data";
import { ISelectionConfig, ISelection } from "./types";
export declare class Selection implements ISelection {
    config: ISelectionConfig;
    events: IEventSystem<SelectionEvents | DataEvents, ISelectionEventsHandlersMap & IDataEventsHandlersMap>;
    private _selected;
    private _data;
    private _nextSelection;
    constructor(config: ISelectionConfig, data: DataCollection, events: IEventSystem<any>);
    enable(): void;
    disable(): void;
    getId(): Id | Id[] | undefined;
    getItem(): IDataItem | IDataItem[];
    contains(id?: Id): boolean;
    remove(id?: Id): void;
    add(id?: Id, isCtrl?: boolean, isShift?: boolean, silent?: boolean): void;
    destructor(): void;
    private _addMulti;
    private _addSingle;
    private _selectItem;
    private _unselectItem;
}
