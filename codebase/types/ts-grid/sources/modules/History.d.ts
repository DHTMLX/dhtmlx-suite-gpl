import { IEventSystem } from "../../../ts-common/events";
import { IExtendedGrid, IProGrid, IRow } from "../types";
export type ActionType = "add" | "remove" | "removeAll" | "change";
export interface IAction {
    type: ActionType;
    batch: IRow[];
    inverse?: IAction;
    timestamp?: number;
}
export declare enum HistoryEvents {
    beforeUndo = "beforeUndo",
    afterUndo = "afterUndo",
    beforeRedo = "beforeRedo",
    afterRedo = "afterRedo",
    beforeAdd = "beforeAdd",
    afterAdd = "afterAdd",
    error = "error"
}
export interface IHistoryEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [HistoryEvents.beforeUndo]: (action: IAction) => boolean | void;
    [HistoryEvents.afterUndo]: (action: IAction) => void;
    [HistoryEvents.beforeRedo]: (action: IAction) => boolean | void;
    [HistoryEvents.afterRedo]: (action: IAction) => void;
    [HistoryEvents.beforeAdd]: (action: IAction) => boolean | void;
    [HistoryEvents.afterAdd]: (action: IAction) => void;
    [HistoryEvents.error]: (error: string, action: IAction | null) => void;
}
export interface IHistoryConfig {
    limit?: number;
    disabled?: boolean;
}
export interface IHistory {
    config: IHistoryConfig;
    events: IEventSystem<HistoryEvents, IHistoryEventsHandlersMap>;
    add(action: IAction): void;
    remove(): void;
    removeAll(): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    getHistory(): IAction[];
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    destructor(): void;
}
export declare class History implements IHistory {
    config: IHistoryConfig;
    events: IEventSystem<HistoryEvents, IHistoryEventsHandlersMap>;
    private _history;
    private _redoStack;
    private _isDisabled;
    private static readonly VALID_ACTION_TYPES;
    constructor(grid: IProGrid | IExtendedGrid);
    add(action: IAction): void;
    remove(): void;
    removeAll(): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    getHistory(): IAction[];
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    destructor(): void;
    private _initConfig;
    private _initHandlers;
    private _fireError;
}
