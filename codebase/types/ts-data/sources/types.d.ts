import { IEventSystem } from "../../ts-common/events";
import { anyFunction, IAnyObj, Id } from "../../ts-common/types";
import { IGroupConfig, TGroupOrder } from "./datacollection/group";
import { TDragItem } from "./DragManager";
export interface IDataProxy {
    url: string;
    config?: any;
    updateUrl?: (url?: string, params?: any) => void;
    load?: () => Promise<any[] | string | void>;
    save?: (data: any, mode: string) => Promise<any>;
}
export interface ILazyDataProxy extends IDataProxy {
    config: ILazyConfig;
}
export interface ILazyConfig {
    from?: number;
    limit?: number;
    delay?: number;
    prepare?: number;
}
export type TSortDir = "asc" | "desc";
export interface ISortMode {
    by?: string | number;
    dir?: TSortDir;
    as?: (a: any) => any;
    rule?: (a: any, b: any) => number;
}
export type ISortingState = ISortMode & ISortConfig;
export type IFilterCallback = (obj: any) => boolean;
export interface IFilterMode {
    by?: Id;
    match?: string | number | boolean;
    compare?: (value: any, match: any, obj: any, multi?: boolean) => boolean;
    multi?: any;
}
export interface IFilterComplexMode {
    [key: string]: IFilterMode;
}
export interface IFilter {
    [key: string]: IFilterParams;
}
export interface IFilterParams {
    rule: IFilterMode | IFilterComplexMode | IFilterCallback;
    config: IFilterConfig | ITreeFilterConfig;
}
export interface IFilterConfig {
    id?: string;
    add?: boolean;
    smartFilter?: boolean;
    permanent?: boolean;
    $restore?: boolean;
    $local?: boolean;
}
export interface IResetFilterConfig {
    id?: string;
    permanent?: boolean;
}
export interface ISortConfig {
    smartSorting?: boolean;
}
export interface ITreeFilterConfig extends IFilterConfig {
    type?: TreeFilterType;
    level?: number;
}
export interface IUpdateObject {
    [key: string]: any;
}
export interface IApproximate {
    value: any;
    maxNum: number;
}
export interface IDataConfig {
    init?: anyFunction;
    update?: anyFunction;
    approximate?: IApproximate;
    autoload?: string;
    collapsed?: boolean;
    rootId?: Id;
}
export interface IGroupDataConfig extends IGroupConfig {
    data?: IDataItem[];
}
export interface IDataCollection<T extends IDataItem = IDataItem> {
    config: IDataConfig;
    events: IEventSystem<DataEvents>;
    dataProxy: IDataProxy;
    loadData: Promise<any>;
    saveData: Promise<any>;
    group(order: TGroupOrder[], config?: IGroupDataConfig): void;
    ungroup(): void;
    isGrouped(): boolean;
    load(url: IDataProxy | string, driver?: IDataDriver | DataDriver): Promise<any>;
    parse(data: T[] | string, driver?: DataDriver | IDataDriver): void;
    $parse(data: any[]): void;
    add(newItem: IDataItem, index?: number): Id;
    add(newItem: IDataItem[], index?: number): Id[];
    add(newItem: IDataItem | IDataItem[], index?: number): Id | Id[];
    remove(id: Id | Id[]): void;
    removeAll(): void;
    update(id: Id, newItem: IUpdateObject, silent?: boolean): void;
    exists(id: Id): boolean;
    getInitialData(): T[];
    getItem(id: Id): T;
    getIndex(id: Id): number;
    getLength(): number;
    isDataLoaded(from?: number, to?: number): boolean;
    getId(index: number): Id;
    filter(rule?: IFilterMode | IFilterCallback, config?: IFilterConfig, silent?: boolean): string;
    resetFilter(config?: IResetFilterConfig, silent?: boolean): boolean;
    getFilters(config?: {
        permanent?: boolean;
    }): IFilter;
    getRawFilters(config?: {
        permanent?: boolean;
    }): IFilter;
    find(rule: IFilterMode): T;
    reduce<A>(callback: ReduceCallBack<T, A>, acc: A): A;
    findAll(rule: IFilterMode): T[];
    map(callback: DataCallback<T>): T[];
    mapRange(from: number, to: number, callback: DataCallback<T>): T[];
    sort(rule?: ISortMode, config?: ISortConfig): void;
    getSortingStates(): ISortingState[];
    serialize(driver?: DataDriver): T[];
    copy(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    move(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    changeId(id: Id, newId?: Id, silent?: boolean): void;
    forEach(callback: DataCallback<T>): void;
    save(url: IDataProxy | string): void;
    isSaved(): boolean;
    getRawData(from: number, to: number, order?: T[] | null, mode?: number): T[];
}
export interface IDataChangeStack {
    order: IDataChange[];
}
export type Statuses = "add" | "update" | "remove" | string;
export interface IDataChange {
    id: Id;
    status: Statuses;
    obj: any;
    saving: boolean;
    promise?: Promise<any>;
    pending?: boolean;
    error?: boolean;
}
export type RequestStatus = "saving" | "pending" | "error";
export interface IDir {
    [key: string]: any;
    asc: number;
    desc: number;
}
export interface IDataDriver {
    toJsonArray(data: any): any[];
    serialize(data: IAnyObj[]): any;
    getRows(data: string): any[];
    getFields(row: any): {
        [key: string]: any;
    };
}
export interface ICsvDriverConfig {
    skipHeader?: number;
    nameByHeader?: boolean;
    names?: string[];
    rowDelimiter?: string;
    columnDelimiter?: string;
}
export declare enum TreeFilterType {
    all = "all",
    level = "level",
    leafs = "leafs"
}
export type DataCallback<T> = (item: T, index?: number, array?: T[]) => any;
export type ReduceCallBack<T, A> = (acc: A, item: T, index?: number) => A;
export interface ITreeCollection<T extends IDataItem = IDataItem> extends IDataCollection<T> {
    add(newItem: IDataItem, index?: number, parent?: Id): Id;
    add(newItem: IDataItem[], index?: number, parent?: Id): Id[];
    add(newItem: IDataItem | IDataItem[], index?: number, parent?: Id): Id | Id[];
    getRoot(): Id;
    getParent(id: Id): Id;
    removeAll(id?: Id): void;
    getLength(id?: Id): number;
    getIndex(id: Id): number;
    getItems(id: Id): T[];
    sort(rule?: ISortMode, config?: ISortConfig): void;
    map(callback: DataCallback<T>, parent?: Id, direct?: boolean): any;
    filter(rule?: IFilterMode | IFilterCallback, config?: ITreeFilterConfig, silent?: boolean): string;
    restoreOrder(): void;
    copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id;
    copy(id: Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id[];
    copy(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    move(id: Id, index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id;
    move(id: Id[], index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id[];
    move(id: Id | Id[], index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id | Id[];
    eachChild(id: Id, callback: DataCallback<T>, direct?: boolean, checkItem?: (item: IDataItem) => boolean): void;
    eachParent(id: Id, callback: DataCallback<T>, self?: boolean): void;
    loadItems(id: Id, driver?: IDataDriver | DataDriver): void;
    refreshItems(id: Id, driver?: IDataDriver | DataDriver): void;
    haveItems(id: Id): boolean;
    canCopy(id: Id, target: Id): boolean;
    forEach(callback: DataCallback<T>, parent?: Id, level?: number): void;
}
export interface IDataItem {
    id?: Id;
    [key: string]: any;
}
export type DropPosition = "top" | "bottom" | "in";
export interface IObjWithData {
    name?: string;
    data: ITreeCollection | IDataCollection;
    events: IEventSystem<DragEvents, IDragEventsHandlersMap>;
    config: IDragConfig;
    id?: Id;
}
export interface ITransferData {
    initXOffset?: number;
    initYOffset?: number;
    x?: number;
    y?: number;
    ghost?: HTMLElement;
    componentId?: Id;
    dragConfig?: IDragConfig;
    component?: IObjWithData;
    dropPosition?: DropPosition;
    dropComponentId?: Id;
    item?: HTMLElement;
    start?: Id;
    source?: Id[];
    target?: Id;
    type?: TDragItem;
    isWasColumn?: boolean;
    groupable?: boolean;
    groupOnly?: boolean;
}
export interface IDragConfig {
    dragCopy?: boolean;
    dropBehaviour?: DropBehaviour;
    dragMode?: DragMode;
}
export interface ICopyObject {
    id: Id;
    component: IObjWithData;
    newId?: Id;
}
export declare enum DataEvents {
    afterAdd = "afteradd",
    beforeAdd = "beforeadd",
    removeAll = "removeall",
    beforeRemove = "beforeremove",
    afterRemove = "afterremove",
    change = "change",
    filter = "filter",
    dataRequest = "dataRequest",
    load = "load",
    loadError = "loaderror",
    beforeLazyLoad = "beforelazyload",
    afterLazyLoad = "afterlazyload",
    beforeItemLoad = "beforeItemLoad",
    afterItemLoad = "afterItemLoad",
    beforeGroup = "beforeGroup",
    afterGroup = "afterGroup",
    beforeUnGroup = "beforeUnGroup",
    afterUnGroup = "afterUnGroup"
}
export interface IDataEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [DataEvents.change]: (id?: Id, status?: Statuses, updatedItem?: any) => void;
    [DataEvents.filter]: (filter?: IFilter) => void;
    [DataEvents.afterAdd]: (newItem: any) => void;
    [DataEvents.afterRemove]: (removedItem: any) => void;
    [DataEvents.beforeAdd]: (newItem: any) => boolean | void;
    [DataEvents.beforeRemove]: (removedItem: any) => boolean | void;
    [DataEvents.removeAll]: () => void;
    [DataEvents.dataRequest]: (from: number, to: number) => void;
    [DataEvents.load]: () => void;
    [DataEvents.loadError]: (response: any) => void;
    [DataEvents.beforeItemLoad]: (id: Id) => boolean | void;
    [DataEvents.afterItemLoad]: (id: Id) => void;
    [DataEvents.beforeLazyLoad]: () => boolean | void;
    [DataEvents.afterLazyLoad]: (from: number, count: number) => void;
    [DataEvents.beforeGroup]: (config: IGroupConfig) => boolean | void;
    [DataEvents.afterGroup]: (grouped: string[], config: IGroupConfig) => void;
    [DataEvents.beforeUnGroup]: (grouped: string[], config: IGroupConfig) => boolean | void;
    [DataEvents.afterUnGroup]: (grouped: string[], config: IGroupConfig) => void;
}
export declare enum DragEvents {
    beforeDrag = "beforeDrag",
    dragStart = "dragStart",
    dragOut = "dragOut",
    dragIn = "dragIn",
    canDrop = "canDrop",
    cancelDrop = "cancelDrop",
    beforeDrop = "beforeDrop",
    afterDrop = "afterDrop",
    afterDrag = "afterDrag"
}
export interface IDragInfo {
    start: Id;
    source: Id[];
    target: Id;
    dropPosition?: DropPosition;
}
export type DragMode = "target" | "both" | "source";
export type DropBehaviour = "child" | "sibling" | "complex";
export interface IDragEventsHandlersMap {
    [key: string]: (...args: any[]) => any;
    [DragEvents.beforeDrag]: (data: IDragInfo, events: MouseEvent, ghost: HTMLElement, type: TDragItem) => void | boolean;
    [DragEvents.dragStart]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void;
    [DragEvents.dragOut]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void;
    [DragEvents.dragIn]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void | boolean;
    [DragEvents.canDrop]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void;
    [DragEvents.cancelDrop]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void;
    [DragEvents.beforeDrop]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => void | boolean;
    [DragEvents.afterDrop]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => any;
    [DragEvents.afterDrag]: (data: IDragInfo, events: MouseEvent, type: TDragItem) => any;
}
export declare enum DataDriver {
    json = "json",
    csv = "csv",
    xml = "xml"
}
export type AjaxResponseType = "json" | "xml" | "text" | "raw";
export interface IAjaxHelperConfig {
    headers: {
        [key: string]: string;
    };
    responseType: AjaxResponseType;
}
export interface IAjaxHelper {
    get<T>(url: string, data?: {
        [key: string]: any;
    } | string, config?: Partial<IAjaxHelperConfig>): Promise<T | void>;
    post<T>(url: string, data?: {
        [key: string]: any;
    } | string, config?: Partial<IAjaxHelperConfig>): Promise<T | void>;
    put<T>(url: string, data?: {
        [key: string]: any;
    } | string, config?: Partial<IAjaxHelperConfig>): Promise<T | void>;
    delete<T>(url: string, data?: {
        [key: string]: any;
    } | string, config?: Partial<IAjaxHelperConfig>): Promise<T | void>;
}
