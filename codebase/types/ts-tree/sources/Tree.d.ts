import { IEventSystem } from "../../ts-common/events";
import { Id } from "../../ts-common/types";
import { View } from "../../ts-common/view";
import { Selection, TreeCollection, DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap } from "../../ts-data";
import { IEditorConfig } from "./Editor";
import { ITree, ITreeConfig, ITreeState, TreeEvents, ITreeEventHandlersMap, ITreeItem } from "./types";
export declare class Tree<T extends object = object> extends View implements ITree {
    config: ITreeConfig;
    data: TreeCollection<T & ITreeItem>;
    events: IEventSystem<DataEvents | TreeEvents | DragEvents, IDataEventsHandlersMap & ITreeEventHandlersMap & IDragEventsHandlersMap>;
    selection: Selection;
    private _editor;
    private _handlers;
    private _isSelectionActive;
    private _root;
    private _focusId;
    private _right;
    private _keyManager;
    private _touch;
    private _isDraget;
    constructor(container: HTMLElement | string, config?: ITreeConfig);
    focusItem(id: Id): void;
    destructor(): void;
    editItem(id: Id, config?: IEditorConfig): void;
    getState(): ITreeState;
    setState(state: ITreeState): void;
    toggle(id: Id): void;
    getChecked(): Id[];
    checkItem(id: Id): void;
    collapse(id: Id): void;
    collapseAll(): void;
    expand(id: Id): void;
    expandAll(): void;
    uncheckItem(id: Id): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    close(id: Id): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    closeAll(): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    open(id: Id): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    openAll(): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    unCheckItem(id: Id): void;
    private _draw;
    private _initEvents;
    private _initHandlers;
    private _dblClick;
    private _clearTouchTimer;
    private _dragStart;
    private _getRightPos;
    private _drawItems;
    private _updateItemCheck;
    private _updateParents;
    private _initHotkeys;
}
