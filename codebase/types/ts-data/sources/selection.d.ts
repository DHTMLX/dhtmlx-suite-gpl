import { IEventSystem } from "../../ts-common/events";
import { SelectionEvents, ISelection, ISelectionConfig, Id } from "../../ts-common/types";
import { DataCollection } from "./datacollection";
export declare class Selection implements ISelection {
    events: IEventSystem<SelectionEvents>;
    config: ISelectionConfig;
    private _selected;
    private _data;
    constructor(config: ISelectionConfig, data?: DataCollection, events?: IEventSystem<any>);
    getId(): Id;
    getItem(): any;
    remove(id?: Id): boolean;
    add(id: Id): void;
    enable(): void;
    disable(): void;
    private _addSingle;
}
