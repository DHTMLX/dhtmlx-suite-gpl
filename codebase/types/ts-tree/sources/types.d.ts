import { IEventSystem } from "../../ts-common/events";
import { Id } from "../../ts-common/types";
import { TreeCollection, DataEvents, DragEvents, IDragConfig, IDataItem, IDragEventsHandlersMap, Selection } from "../../ts-data";
import { IEditorConfig } from "./Editor";
export interface ITreeState {
    [id: string]: {
        selected: SelectStatus;
        open: boolean;
    };
}
export interface ITreeItem extends IDataItem {
    parent: string;
    opened?: boolean;
    $mark?: SelectStatus;
    checkbox?: boolean;
    $autoload?: boolean;
    $selected?: boolean;
    $editor?: boolean;
}
export interface ITreeCustomIcon {
    file?: string;
    folder?: string;
    openFolder?: string;
}
export declare enum SelectStatus {
    unselected = 0,
    selected = 1,
    indeterminate = 2
}
export declare type ItemIcon = "file" | "folder" | "openFolder";
export interface ITreeConfig extends IDragConfig {
    data?: TreeCollection<any> | any[];
    css?: string;
    keyNavigation?: boolean;
    autoload?: string;
    checkbox?: boolean;
    isFolder?: (obj: any) => boolean;
    icon?: ITreeCustomIcon;
    editable?: boolean;
    selection?: boolean;
    rootId?: Id;
    itemHeight?: number | string;
    template?: (item: ITreeItem, isFolder: boolean) => string;
    eventHandlers?: {
        [eventName: string]: {
            [className: string]: (events: Event, item: ITree) => void;
        };
    };
    $editable?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    editing?: boolean;
}
export interface ITree {
    data: TreeCollection;
    events: IEventSystem<DataEvents | DragEvents | TreeEvents>;
    selection: Selection;
    config: ITreeConfig;
    paint(): void;
    destructor(): void;
    editItem(id: Id, config: IEditorConfig): void;
    getState(): ITreeState;
    setState(state: ITreeState): void;
    focusItem(id: Id): void;
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
}
export declare enum TreeEvents {
    itemClick = "itemclick",
    itemDblClick = "itemdblclick",
    itemRightClick = "itemrightclick",
    beforeCollapse = "beforeCollapse",
    afterCollapse = "afterCollapse",
    beforeExpand = "beforeExpand",
    afterExpand = "afterExpand",
    beforeEditStart = "beforeEditStart",
    afterEditStart = "afterEditStart",
    beforeEditEnd = "beforeEditEnd",
    afterEditEnd = "afterEditEnd",
    focusChange = "focusChange",
    beforeCheck = "beforeCheck",
    afterCheck = "afterCheck",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    itemContextMenu = "itemcontextmenu"
}
export interface ITreeEventHandlersMap extends IDragEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [TreeEvents.itemClick]: (id: Id, e: Event) => any;
    [TreeEvents.itemRightClick]: (id: Id, e: Event) => void;
    [TreeEvents.itemDblClick]: (id: Id, e: Event) => void;
    [TreeEvents.beforeCollapse]: (id: Id) => boolean | void;
    [TreeEvents.afterCollapse]: (id: Id) => void;
    [TreeEvents.beforeExpand]: (id: Id) => boolean | void;
    [TreeEvents.afterExpand]: (id: Id) => void;
    [TreeEvents.beforeEditStart]: (value: string, id: Id) => boolean | void;
    [TreeEvents.afterEditStart]: (value: string, id: Id) => void;
    [TreeEvents.beforeEditEnd]: (value: string, id: Id) => boolean | void;
    [TreeEvents.afterEditEnd]: (value: string, id: Id) => void;
    [TreeEvents.focusChange]: (index: number, id: Id) => void;
    [TreeEvents.beforeCheck]: (index: number, id: Id) => boolean | void;
    [TreeEvents.afterCheck]: (index: number, id: Id, value: boolean) => void;
    [TreeEvents.itemContextMenu]: (id: Id, e: Event) => any;
}
