import { DataCollection, DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap } from "../../ts-data";
import { VNode } from "../../ts-common/dom";
import { IEventSystem } from "../../ts-common/events";
import { IKeyManager } from "../../ts-common/KeyManager";
import { IHandlers, Id } from "../../ts-common/types";
import { View } from "../../ts-common/view";
import { IList, IListConfig, IListEventHandlersMap, IListItem, ISelection, ListEvents } from "./types";
export declare const MOVE_UP = 1;
export declare const MOVE_DOWN = 2;
export declare class List extends View implements IList {
    config: IListConfig;
    data: DataCollection;
    events: IEventSystem<DataEvents | ListEvents | DragEvents, IListEventHandlersMap & IDataEventsHandlersMap & IDragEventsHandlersMap>;
    selection: ISelection;
    keyManager: IKeyManager;
    protected _handlers: IHandlers;
    protected _focus: Id;
    protected _edited: Id;
    protected _events: IHandlers;
    private _topOffset;
    private _visibleHeight;
    private _touch;
    protected _changed: boolean;
    constructor(node: HTMLElement | string, config?: IListConfig);
    protected _didRedraw(vm: any): void;
    private _dblClick;
    private _clearTouchTimer;
    private _dragStart;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    disableSelection(): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    enableSelection(): void;
    editItem(id: Id): void;
    editEnd(value: any, id?: Id): void;
    getFocusItem(): any;
    setFocus(id: Id): void;
    getFocus(): Id;
    destructor(): void;
    showItem(id: Id): void;
    protected _renderItem(item: IListItem, index: number): VNode;
    protected _renderList(): VNode;
    moveFocus(mode: number, step?: number): void;
    protected _getRange(): [number, number, number, number];
    protected _getHotkeys(): IHandlers;
    private _initHotKey;
    private getItemAriaAttrs;
    protected _getListAriaAttrs(config: any, dataLength: any): {
        role: string;
        "aria-label": string;
        "aria-multiselectable": string;
        "aria-readonly": string;
    };
}
