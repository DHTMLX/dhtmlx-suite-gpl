import { IEventSystem } from "./events";
export interface IHandlers {
    [key: string]: anyFunction | IHandlers;
}
export declare type Id = string | number;
export declare type fn<T extends any[], K> = (...args: T) => K;
export declare type anyFunction = fn<any[], any>;
export interface IAnyObj {
    [key: string]: any;
}
export interface ISelectionConfig {
    disabled?: boolean;
}
export interface ISelection {
    events: IEventSystem<SelectionEvents>;
    config: ISelectionConfig;
    getId(): Id;
    getItem(): any;
    add(id: Id): void;
    remove(id?: Id): boolean;
    enable(): void;
    disable(): void;
}
export declare enum SelectionEvents {
    beforeUnSelect = "beforeunselect",
    afterUnSelect = "afterunselect",
    beforeSelect = "beforeselect",
    afterSelect = "afterselect"
}
export interface ISelectionEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [SelectionEvents.afterSelect]: (id: Id) => void;
    [SelectionEvents.afterUnSelect]: (id: Id) => void;
    [SelectionEvents.beforeSelect]: (id: Id) => void | boolean;
    [SelectionEvents.beforeUnSelect]: (id: Id) => void | boolean;
}
export interface ITouchParam {
    duration?: number;
    timer?: any;
    start?: boolean;
    timeStamp?: number;
    dblDuration?: number;
}
