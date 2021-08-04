import { DataCollection, DataEvents, DragEvents, IDataEventsHandlersMap, IDragEventsHandlersMap } from "../../ts-data";
import { IEventSystem } from "../../ts-common/events";
import { ISelection, MultiselectionMode, IListConfig, IListEventHandlersMap, ListEvents } from "../../ts-list";
import { ScrollView } from "../../ts-common/ScrollView";
import { Id } from "../../ts-common/types";
export interface IDataViewConfig extends IListConfig {
    data?: DataCollection<any> | any[];
    itemsInRow?: number;
    height?: number | string;
    itemHeight?: number | string;
    gap?: number;
    template?: (item: any) => string;
    keyNavigation?: boolean | (() => boolean);
    css?: string;
    selection?: boolean;
    multiselection?: boolean | MultiselectionMode;
    editable?: boolean;
    eventHandlers?: {
        [key: string]: any;
    };
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    editing?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    multiselectionMode?: MultiselectionMode;
}
export interface IDataView<T = any> {
    config: IDataViewConfig;
    data: DataCollection<T>;
    events: IEventSystem<DataEvents | DragEvents | ListEvents, IDataEventsHandlersMap & IDragEventsHandlersMap & IListEventHandlersMap>;
    selection: ISelection;
    paint(): void;
    destructor(): void;
    editItem(id: Id): void;
    getFocusItem(): T;
    setFocus(id: Id): void;
    getFocus(): Id;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    disableSelection(): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    enableSelection(): void;
}
export interface IProDataView extends IDataView {
    scrollView: ScrollView;
}
export declare enum DataViewEvents {
    click = "click",
    doubleClick = "doubleclick",
    focusChange = "focuschange",
    beforeEditStart = "beforeEditStart",
    afterEditStart = "afterEditStart",
    beforeEditEnd = "beforeEditEnd",
    afterEditEnd = "afterEditEnd",
    itemRightClick = "itemRightClick",
    itemMouseOver = "itemMouseOver",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    contextmenu = "contextmenu"
}
export interface IDataViewItem {
    [key: string]: any;
}
