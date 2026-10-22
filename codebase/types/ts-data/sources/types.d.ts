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
/** Sorting direction: ascending or descending. */
export type TSortDir = "asc" | "desc";
/**
 * A single sorting rule. Set either `by` or `rule`; with neither of them the rule has no effect.
 *
 * @example
 * ```ts
 * // sort by a field
 * collection.sort({ by: "country", dir: "asc" });
 *
 * // sort by a computed value
 * collection.sort({ by: "date", dir: "desc", as: value => new Date(value).getTime() });
 *
 * // sort by a custom comparator
 * collection.sort({ rule: (a, b) => a.price - b.price });
 * ```
 */
export interface ISortMode {
    /** Name of the field to sort by. */
    by?: string | number;
    /** Sorting direction. Defaults to `"asc"`. */
    dir?: TSortDir;
    /** Maps a field value to the value actually compared (e.g. a date string to a timestamp). Ignored if `rule` is set. */
    as?: (a: any) => any;
    /** Custom comparator applied to whole items. Takes precedence over `by` and `as`. */
    rule?: (a: any, b: any) => number;
}
/** An applied sorting rule together with the config it was applied with. */
export type ISortingState = ISortMode & ISortConfig;
/** Predicate that decides whether an item passes the filter. */
export type IFilterCallback = (obj: any) => boolean;
/**
 * A single filtering rule.
 *
 * @example
 * ```ts
 * // keep items whose "country" equals "France"
 * collection.filter({ by: "country", match: "France" });
 *
 * // keep items whose "age" is 30 or more
 * collection.filter({ by: "age", match: "30", compare: (value, match) => Number(value) >= Number(match) });
 * ```
 */
export interface IFilterMode {
    /** Name of the field to filter by. */
    by?: Id;
    /**
     * Value the field is matched against. A multiselect filter passes an array of values,
     * which `compare` is expected to treat as "any of these" — see `multi`.
     */
    match?: string | number | boolean | Array<string | number | boolean>;
    /**
     * Custom comparison. Without it the field value is compared to `match` loosely by a flat
     * collection, while a tree one checks that the value contains `match` ignoring case.
     */
    compare?: (value: any, match: any, obj: any, multi?: boolean) => boolean;
    /**
     * Marks the field as holding several values at once (a multiselect column stores them
     * as a comma-separated string). Passed to `compare` as its last argument, both by a flat
     * collection and by a tree one.
     */
    multi?: boolean;
}
/** A set of filtering rules combined with AND, keyed by an arbitrary name. */
export interface IFilterComplexMode {
    [key: string]: IFilterMode;
}
/** Applied filters, keyed by filter id. */
export interface IFilter {
    [key: string]: IFilterParams;
}
/** An applied filtering rule together with the config it was applied with. */
export interface IFilterParams {
    rule: IFilterMode | IFilterComplexMode | IFilterCallback;
    config: IFilterConfig | ITreeFilterConfig;
}
/** Options that control how a filtering rule is applied and stored. */
export interface IFilterConfig {
    /** Id to store the filter under. Reapplying with the same id replaces the previous rule. Generated automatically if omitted. */
    id?: string;
    /** Applies the rule on top of the already filtered data instead of replacing the active filters. */
    add?: boolean;
    /**
     * Marks the filter as permanent. Permanent filters are not dropped by `resetFilter()`
     * and are reapplied to newly loaded data after `parse()` / `load()`.
     */
    permanent?: boolean;
    /**
     * Reapplies the stored filters instead of registering a new one.
     * @internal
     */
    $restore?: boolean;
    /**
     * Hides the filter from `getFilters()` and from the `filter` event.
     * @internal
     */
    $local?: boolean;
    /** @deprecated Not used. Kept for backward compatibility. */
    smartFilter?: boolean;
}
/** Options that control which filters `resetFilter()` removes. */
export interface IResetFilterConfig {
    /** Removes only the filter with this id. */
    id?: string;
    /** Removes permanent filters as well. Without it they survive the reset. */
    permanent?: boolean;
}
/** Options that control how a sorting rule is applied and stored. */
export interface ISortConfig {
    /**
     * Makes the rule the base level of a multi-level sorting: the previously applied
     * levels are discarded and the order is maintained when items are added or updated.
     * While such a base is in place every next rule is appended as another level instead of
     * replacing it - both with `smartSorting: false` and with no config at all. Without a base
     * every rule replaces whatever is applied.
     * To sort anew while a base is in place, reset the sorting first: `sort()`, then `sort(rule)`.
     */
    smartSorting?: boolean;
}
/** Options that control how a filtering rule is applied to a tree collection. */
export interface ITreeFilterConfig extends IFilterConfig {
    /** Which items the rule is matched against: all of them, a single level, or leaf items only. */
    type?: TreeFilterType;
    /** Nesting level the rule is applied to when `type` is `"level"`. */
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
    $parse(data: any[], resetRules?: boolean): void;
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
    getVisibleIndex(id: Id): number;
    getLength(): number;
    isDataLoaded(from?: number, to?: number): boolean;
    getId(index: number): Id;
    filter(rule?: IFilterMode | IFilterComplexMode | IFilterCallback, config?: IFilterConfig, silent?: boolean): string;
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
    sort(rule?: ISortMode, config?: ISortConfig, ignore?: boolean): void;
    getSortingStates(): ISortingState[];
    serialize(driver?: DataDriver): T[];
    copy(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    move(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    changeId(id: Id, newId?: Id, silent?: boolean): Id;
    forEach(callback: DataCallback<T>): void;
    save(url: IDataProxy | string): void;
    isSaved(): boolean;
    getRawData(from: number, to: number, order?: T[] | null, mode?: number): T[];
}
export interface IDataChangeStack {
    order: IDataChange[];
}
export type Statuses = "add" | "update" | "remove" | string;
/**
 * Service payload of the {@link DataEvents.change} event.
 * @internal Not a part of the public API, may be extended or changed without notice.
 */
export interface IDataChangeService {
    /** the previous id of the item, set by changeId */
    oldId?: Id;
}
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
/** Scope a tree filtering rule is matched against. */
export declare enum TreeFilterType {
    /** Every item at any nesting level. */
    all = "all",
    /** Only items at the level given by {@link ITreeFilterConfig.level}. */
    level = "level",
    /** Only items without children. */
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
    getVisibleIndex(id: Id, flat?: boolean): number;
    getItems(id: Id): T[];
    sort(rule?: ISortMode, config?: ISortConfig, ignore?: boolean): void;
    map(callback: DataCallback<T>, parent?: Id, direct?: boolean): any;
    filter(rule?: IFilterMode | IFilterComplexMode | IFilterCallback, config?: ITreeFilterConfig, silent?: boolean): string;
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
    [DataEvents.change]: (id?: Id, status?: Statuses, updatedItem?: IDataItem, service?: IDataChangeService) => void;
    [DataEvents.filter]: (filter?: IFilter) => void;
    [DataEvents.beforeAdd]: (newItem: IDataItem, batch: IDataItem[], index: number) => boolean | void;
    [DataEvents.afterAdd]: (newItem: IDataItem, batch: IDataItem[], index: number) => void;
    [DataEvents.beforeRemove]: (removedItem: IDataItem, batch: IDataItem[], index: number) => boolean | void;
    [DataEvents.afterRemove]: (removedItem: IDataItem, batch: IDataItem[], index: number) => void;
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
