import { IEventSystem } from "../../ts-common/events";
import { Id } from "../../ts-common/types";
import { Sort } from "./datacollection/sort";
import { DataCallback, DataEvents, IDataChangeService, IDataCollection, IDataItem, IDataProxy, IFilterCallback, IFilterConfig, IFilterMode, ISortMode, ITreeCollection, IUpdateObject, ReduceCallBack, Statuses, IDataEventsHandlersMap, DataDriver, IDataConfig, ISortConfig, IDataDriver, IFilterComplexMode, IFilter, IResetFilterConfig, IGroupDataConfig, ISortingState } from "./types";
import { TGroupOrder, IGroup } from "./datacollection/group";
export declare class DataCollection<T extends IDataItem = IDataItem> implements IDataCollection<T> {
    loadData: Promise<any>;
    saveData: Promise<any>;
    dataProxy: IDataProxy;
    config: IDataConfig;
    events: IEventSystem<DataEvents, IDataEventsHandlersMap>;
    protected _order: T[];
    protected _pull: {
        [id: string]: T;
    };
    protected _sort: Sort;
    protected _sorter: ISortMode;
    protected _meta: any;
    protected _range: [number, number];
    protected _loaded: boolean;
    protected _initFilterOrder: T[];
    protected _initSortOrder: T[];
    protected _filters: IFilter;
    protected _group: IGroup;
    protected _sortingStates: ISortingState[];
    private _changes;
    private _loader;
    constructor(config?: any, events?: IEventSystem<any>);
    protected _reset(config?: {
        grouping?: boolean;
    }): void;
    group(order: TGroupOrder[], config?: IGroupDataConfig): void;
    ungroup(): void;
    isGrouped(): boolean;
    add(newItem: IDataItem, index?: number): Id;
    add(newItem: IDataItem[], index?: number): Id[];
    remove(id: Id | Id[]): void;
    removeAll(): void;
    exists(id: Id): boolean;
    getNearId(id: Id): Id;
    getItem(id: Id): T;
    update(id: Id, newItem: IUpdateObject, silent?: boolean): void;
    getIndex(id: Id): number;
    /**
     * Returns the index of an item among the visible ones, i.e. in the order the items are
     * rendered in. Unlike {@link DataCollection.getIndex} the hidden items are not counted, and
     * a range set by {@link DataCollection.setRange} narrows the counting down to that range.
     * @param id - The id of the item.
     * @returns The zero-based index of the item, or `-1` if the item doesn't exist, is hidden,
     * or is out of the currently set range.
     * @example
     * ```ts
     * collection.update("2", { hidden: true });
     * collection.getIndex("3"); // 2
     * collection.getVisibleIndex("3"); // 1
     * collection.getVisibleIndex("2"); // -1
     * ```
     */
    getVisibleIndex(id: Id): number;
    getId(index: number): Id;
    getLength(): number;
    isDataLoaded(from?: number, to?: number): boolean;
    /**
     * Filters the collection.
     * Replaces the currently applied filters unless `config.add` is set; permanent filters always
     * survive and are combined with the new rule - they are applied first and the new rule narrows
     * the result further, so the two act as AND. Calling the method without a rule drops all
     * non-permanent filters and restores the unfiltered order.
     * @param rule - A single rule, a set of rules combined with AND, or a predicate. Omit to reset filtering.
     * @param config - Options that control how the rule is applied and stored.
     * @param silent - Whether to suppress the `filter` event. Defaults to `false`.
     * @returns The id the filter is stored under, or `undefined` if no rule was passed or the call
     * only reapplied the already stored filters.
     * @example
     * ```ts
     * // keep items whose "age" is 30 or more
     * collection.filter({ by: "age", match: "30", compare: (value, match) => Number(value) >= Number(match) });
     *
     * // narrow the current result further instead of replacing it
     * collection.filter({ by: "country", match: "France" }, { add: true });
     *
     * // a filter that survives resetFilter() and data reloading
     * collection.filter({ by: "archived", match: false }, { permanent: true });
     *
     * collection.filter();
     * ```
     */
    filter(rule?: IFilterMode | IFilterComplexMode | IFilterCallback, config?: IFilterConfig, silent?: boolean): string;
    /**
     * Removes the applied filters and restores the unfiltered order. Whatever is left after the
     * removal is reapplied to the restored order.
     * Permanent filters are kept and reapplied unless `config.permanent` is set.
     * @param config - Restricts the reset to a single filter or extends it to permanent ones. Omit to
     * drop all non-permanent filters. `permanent` wins over `id`: passing both removes every filter,
     * not just the one with that id.
     * @param silent - Whether to suppress the `filter` event. Defaults to `false`.
     * @returns `true` if no user-facing filters are left applied. Filters applied internally by a
     * widget are not counted, so the result can be `true` while such a filter is still in effect.
     * @example
     * ```ts
     * collection.resetFilter();                        // all non-permanent filters
     * collection.resetFilter({ id: filterId });        // one filter
     * collection.resetFilter({ permanent: true });     // everything, permanent included
     * ```
     */
    resetFilter(config?: IResetFilterConfig, silent?: boolean): boolean;
    /**
     * Returns the currently applied filters, keyed by filter id.
     * Filters applied internally by a widget are omitted; use {@link DataCollection.getRawFilters} to get them as well.
     * @param config - Set `permanent` to return only permanent filters.
     * @returns The applied filters, or `null` if there are none.
     */
    getFilters(config?: {
        permanent?: boolean;
    }): IFilter;
    /**
     * Returns the currently applied filters including the ones applied internally by a widget.
     * @param config - Set `permanent` to return only permanent filters.
     * @returns The applied filters, or `null` if there are none.
     */
    getRawFilters(config?: {
        permanent?: boolean;
    }): IFilter;
    find(conf: IFilterMode | DataCallback<T>): any;
    findAll(conf: IFilterMode | DataCallback<T>): any[];
    /**
     * Sorts the collection.
     * A rule applied on its own replaces whatever was applied before. Multi-level sorting is built
     * by applying the base level with `smartSorting: true`: while that base is in place every next
     * rule is appended as another level instead of replacing it, whether it comes with
     * `smartSorting: false` or with no config at all. A rule for a field that is already a level
     * only changes that level's direction. Calling the method without a rule resets the sorting
     * and restores the original order.
     * Does not work while data is being lazy-loaded.
     * @param rule - The sorting rule. Omit to reset the sorting.
     * @param config - Options that control how the rule is combined with the already applied ones.
     * @param ignore - Internal. Reorders the data without recording the rule in the sorting state
     * and without firing the `change` event. A call that resets the sorting still clears the state.
     * Defaults to `false`.
     * @example
     * ```ts
     * collection.sort({ by: "country", dir: "asc" });
     *
     * // two-level sorting: by country, then by population
     * collection.sort({ by: "country", dir: "asc" }, { smartSorting: true });
     * collection.sort({ by: "population", dir: "desc" }, { smartSorting: false });
     *
     * // sorting anew while a base is in place - reset first
     * collection.sort();
     * collection.sort({ by: "population", dir: "desc" });
     * ```
     */
    sort(rule?: ISortMode, config?: ISortConfig, ignore?: boolean): void;
    /**
     * Returns the currently applied sorting rules, from the base level to the last one added.
     * The array is the one the collection sorts by, not a copy: do not modify it.
     * @returns The applied rules, or an empty array if the collection is not sorted.
     */
    getSortingStates(): ISortingState[];
    copy(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id | Id[];
    move(id: Id | Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id, newId?: Id): Id | Id[];
    forEach(callback: DataCallback<T>): void;
    load(url: IDataProxy | string, driver?: IDataDriver | DataDriver): Promise<any>;
    parse(data: T[] | string, driver?: DataDriver | IDataDriver): any;
    /**
     * Puts already normalized data into the collection and notifies the subscribers.
     * Called by the loader once a driver has converted the raw input into an array of items.
     * @param data - Normalized items.
     * @param resetRules - Whether to drop the sorting and non-permanent filtering rules before
     * putting the data in. Set for `parse()` and `load()`, which replace the whole dataset, and
     * not set for grouping, which only rebuilds the order. Defaults to `false`.
     * @internal
     */
    $parse(data: any[], resetRules?: boolean): void;
    save(url: IDataProxy | string): void;
    /**
     * Changes the id of a data item.
     * @param id - The current id of the item.
     * @param newId - The new id for the item. If omitted, a unique id is generated automatically.
     * @param silent - If true, the change event is not fired.
     * @returns The new id of the item, or the original id if the change was rejected.
     */
    changeId(id: Id, newId?: Id, silent?: boolean): Id;
    isSaved(): boolean;
    map(callback: DataCallback<T>): any[];
    mapRange(from: number, to: number, callback: DataCallback<T>): any[];
    reduce<A>(callback: ReduceCallBack<T, A>, acc: A): A;
    serialize(driver?: DataDriver): any;
    getInitialData(): T[];
    setMeta(obj: T, key: string, value: any): void;
    getMeta(obj: T, key: string): any;
    getMetaMap(obj: T): any;
    setRange(from: number, to: number): void;
    getRawData(from: number, to: number, order?: T[], mode?: number): T[];
    protected _add({ newItem, index, order, batch, }: {
        newItem: IDataItem;
        batch: IDataItem[];
        order?: number;
        index?: number;
    }): Id;
    protected _remove(id: Id, batch: Id[], index?: number): void;
    protected _copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id, key?: number): Id;
    protected _move(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id, key?: number, newId?: Id): Id;
    protected _addCore(obj: IDataItem, index?: number): Id;
    protected _removeCore(id: Id): void;
    protected _parse_data(data: any[]): void;
    protected _approximate(data: any[], values: string[], maxNum: number): any[];
    /**
     * Remaps the item to the new id inside all the internal structures.
     * `_order`, `_initFilterOrder` and `_initSortOrder` keep the references to the same
     * objects as `_pull`, so changing `item.id` is enough for them.
     * @internal
     */
    protected _changeIdCore(id: Id, newId: Id): void;
    /**
     * Retargets the pending save operations of the item to its new id,
     * so that a rename between `add` and `save` doesn't produce a second request.
     * @internal
     */
    private _remapChanges;
    protected _onChange(status: Statuses, id: Id, obj: any, service?: IDataChangeService): void;
    protected _addToOrder(array: any[], obj: any, index?: number): void;
    /**
     * Reorders the data by all currently stored sorting rules.
     * @internal
     */
    protected _applySorters(): void;
    /**
     * Narrows the data by a single rule, remembering the unfiltered order on first use.
     * @param rule - The rule to apply. A missing rule is a no-op.
     * @throws If the rule is neither a predicate nor a valid field/value pair.
     * @internal
     */
    protected _applyFilters(rule?: IFilterMode | IFilterCallback): void;
    /**
     * Drops the sorting rules and restores the order the data had before sorting.
     * If filtering was applied on top of the sorting, it is reapplied to the restored order.
     * @internal
     */
    protected _resetSorting(): void;
    /**
     * Forgets the filters that do not outlive a data change, keeping the permanent ones.
     * @internal
     */
    protected _dropNonPermanentFilters(): void;
    /**
     * Drops the rules that must not outlive a full data replacement: the sorting and
     * the non-permanent filters. The counterpart of {@link DataCollection._reapplyRules},
     * which restores everything that does outlive it.
     * Called before the new data is put in, so the surviving permanent filters are only forgotten
     * here, not reapplied: applying them to an empty collection would memorize an empty
     * pre-filter state and lose the data that comes next.
     * @internal
     */
    protected _resetRules(): void;
    /**
     * Restores the rules that outlive a data change: the permanent filters and,
     * while smart sorting is on, the sorting order. Called after items are added, updated or parsed,
     * and after a tree is sorted.
     * @internal
     */
    protected _reapplyRules(): void;
    /**
     * Brings the group headers in line with the items the collection holds now: the counts and the
     * aggregates next to the group names are computed while the tree is built, so every change of
     * what is in the collection leaves them stale. Headers left with nothing under them are dropped
     * unless `showEmptyGroups` is set — see {@link DataCollection._dropGroups} for what dropping a
     * header costs it.
     * @internal
     */
    protected _recalculateGroups(): void;
    /**
     * Collects a group header together with everything below it: the nested headers, their summary
     * rows and the items. Removing the header alone would leave the items with a parent that is not
     * there any more, and the counts of the groups above it short.
     * A `TreeCollection` needs none of this, its {@link TreeCollection._removeCore} already takes
     * the subtree of an item with it.
     * @param id - The id of the header.
     * @returns The ids to remove, the header itself last.
     * @internal
     */
    protected _getGroupSubtree(id: Id): Id[];
    /**
     * Takes the group headers left with nothing in them out of the data, their summary rows and
     * their nested groups included: a group is empty only when everything under it is.
     * While a filter is applied the headers only leave `_order`, because `_initFilterOrder` keeps
     * the whole grouped order and resetting the filter has to bring them back. Without a filter
     * there is nothing to restore them from, so they leave the collection for good.
     * @param ids - Ids of the headers to drop.
     * @internal
     */
    protected _dropGroups(ids: Set<string>): void;
    /**
     * Counts the items every group header holds in a given order, its whole subtree and not just
     * the items directly under it. Summary rows are not items.
     * @param order - The order to count over.
     * @returns The counts, keyed by header id.
     * @internal
     */
    protected _countGroupItems(order: T[]): Map<Id, number>;
    /**
     * Turns a field/value rule into a predicate.
     * @param rule - The rule to convert.
     * @returns The predicate, or `undefined` if the rule has no field or no value to match.
     * @internal
     */
    protected _getRuleCallback(rule: IFilterMode): IFilterCallback;
    /**
     * Strips the filters applied by a widget, leaving only those the user set.
     * @param filters - The filters to strip.
     * @returns The user-facing filters.
     * @internal
     */
    protected _getPureFilters(filters: IFilter): IFilter;
    /**
     * Flattens stored filters into a set of predicates that can be reapplied at once.
     * @param filters - The stored filters.
     * @returns A set of predicates keyed by index.
     * @internal
     */
    protected _normalizeFilters(filters: any): any;
    /**
     * Checks that a rule can be applied: it is either a predicate or has both a field and a value.
     * @param rule - The rule to check.
     * @returns Whether the rule is valid.
     * @internal
     */
    protected _checkFilterRule(rule: IFilterMode | IFilterCallback): boolean;
    /**
     * Clears the collection and hands the data over to the loader.
     * @param data - Items or a serialized string.
     * @param driver - Data driver used to parse the input. Defaults to the JSON driver.
     * @param grouping - Whether the call rebuilds the order for grouping rather than replaces the
     * dataset. Grouping keeps the sorting and filtering rules, a replacement drops them. Defaults to `false`.
     * @internal
     */
    private _parse;
    /**
     * Fires the change event. The service payload is appended only when it is set,
     * so that the arguments of the event stay exactly the same as before for every
     * operation that doesn't provide it.
     * @internal
     */
    private _fireChange;
}
