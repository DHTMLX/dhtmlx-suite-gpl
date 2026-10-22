import { IEventSystem } from "../../ts-common/events";
import { DataCollection } from "./datacollection";
import { DataCallback, DataEvents, IDataCollection, IDataItem, ITreeCollection, IFilterCallback, IFilterMode, IFilterComplexMode, ITreeFilterConfig, DataDriver, ISortMode, IDataDriver, IUpdateObject, ISortConfig } from "./types";
import { Id } from "../../ts-common/types";
export declare function addToOrder(store: any, obj: object, parent: Id, index: number): void;
export declare class TreeCollection<T extends IDataItem = IDataItem> extends DataCollection<T> implements ITreeCollection<T> {
    protected _children: {
        [id: string]: T[];
    };
    protected _root: Id;
    protected _initChildren: {
        [id: string]: T[];
    };
    constructor(config?: any, events?: IEventSystem<DataEvents>);
    add(newItem: IDataItem, index?: number, parent?: Id): Id;
    add(newItem: IDataItem[], index?: number, parent?: Id): Id[];
    getRoot(): Id;
    getParent(id: Id, asObj?: boolean): Id;
    getItems(id: Id): T[];
    getLength(id?: Id): number;
    removeAll(id?: Id): void;
    update(id: Id, newItem: IUpdateObject, silent?: boolean): void;
    getIndex(id: Id): number;
    /**
     * Returns the index of an item among the visible ones, i.e. in the order the items are
     * rendered in. Unlike {@link TreeCollection.getIndex} the hidden items are not counted, and an
     * item that is not rendered at all gets `-1`. A range set by {@link DataCollection.setRange}
     * leaves the top level items of the current page only.
     * @param id - The id of the item.
     * @param flat - Whether the index is counted in the flat list of all the visible items, i.e.
     * the items of the expanded branches above the item are counted as well. By default the index
     * is counted within the parent branch of the item only. Defaults to `false`.
     * @returns The zero-based index of the item, or `-1` if the item doesn't exist, is hidden, is
     * placed under a hidden or a collapsed parent, or is out of the currently set range.
     * @example
     * ```ts
     * // "1", "2", "3" are top level items, "3" is expanded and holds "3.1" and "3.2"
     * collection.update("3.1", { hidden: true });
     * collection.getIndex("3.2"); // 1 - the second child of "3"
     * collection.getVisibleIndex("3.2"); // 0 - the first rendered child of "3"
     * collection.getVisibleIndex("3.2", true); // 3 - the fourth rendered item
     *
     * collection.update("3", { $opened: false });
     * collection.getVisibleIndex("3.2"); // -1
     * collection.getVisibleIndex("3.2", true); // -1
     * ```
     */
    getVisibleIndex(id: Id, flat?: boolean): number;
    /**
     * Sorts the tree, reordering the items within each parent independently.
     * The rules are combined the same way as in {@link DataCollection.sort}, but unlike it this
     * method has no lazy-loading guard and reorders whatever is currently in the tree.
     * @param rule - The sorting rule. Omit to reset the sorting.
     * @param config - Options that control how the rule is combined with the already applied ones.
     * @param ignore - Internal. Reorders the data without recording the rule in the sorting state
     * and without firing the `change` event. A call that resets the sorting still clears the state.
     * Defaults to `false`.
     */
    sort(rule?: ISortMode, config?: ISortConfig, ignore?: boolean): void;
    /**
     * Filters the tree, keeping the matched items together with their parent chain.
     * By default every item at every nesting level is matched; `config.type` narrows that
     * to a single level or to leaf items only. Rules are stored and combined the same way as in
     * {@link DataCollection.filter}, but a rule without `compare` is matched differently: the field
     * value has to contain `match` ignoring case, rather than be loosely equal to it, and a rule
     * with an empty `match` is skipped instead of filtering everything out.
     * @param rule - A single rule, a set of rules combined with AND, or a predicate. Omit to reset filtering.
     * @param config - Options that control which items the rule is matched against and how it is stored.
     * @param silent - Whether to suppress the `filter` event. Defaults to `false`.
     * @returns The id the filter is stored under, or `undefined` if no rule was passed.
     * @example
     * ```ts
     * // match every item at any level
     * collection.filter({ by: "status", match: "done" });
     *
     * // match leaf items only
     * collection.filter({ by: "status", match: "done" }, { type: "leafs" });
     * ```
     */
    filter(rule?: IFilterMode | IFilterComplexMode | IFilterCallback, config?: ITreeFilterConfig, silent?: boolean): string;
    /**
     * Restores the original order of the tree, dropping the sorting and every filter,
     * permanent ones included.
     */
    restoreOrder(): void;
    copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id;
    copy(id: Id[], index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id[];
    move(id: Id, index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id;
    move(id: Id[], index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id[];
    forEach(callback: DataCallback<any>, parent?: Id, level?: number): void;
    eachChild(id: Id, callback: DataCallback<T>, direct?: boolean, checkItem?: (item: IDataItem) => boolean): void;
    getNearId(id: Id): Id;
    loadItems(id: Id, driver?: IDataDriver | DataDriver): void;
    refreshItems(id: Id, driver?: IDataDriver | DataDriver): void;
    eachParent(id: Id, callback: DataCallback<T>, self?: boolean): void;
    haveItems(id: Id): boolean;
    canCopy(id: Id, target: Id): boolean;
    serialize(driver?: DataDriver, checkItem?: (item: any) => any): any;
    getId(index: number, parent?: Id): Id;
    map(callback: DataCallback<T>, parent?: Id, direct?: boolean): any[];
    getRawData(from: number, to: number, order?: T[], mode?: number, parent?: Id): T[];
    /**
     * Tells whether the children of an item are rendered. Both flags in use are checked:
     * `$opened`, set by TreeGrid, and `opened`, set by Tree.
     * @param item - The item to check.
     * @returns `true` if the item is expanded.
     * @internal
     */
    protected _isOpened(item: T): boolean;
    /**
     * Gives the range of the top level items to count, narrowed by {@link DataCollection.setRange}.
     * @returns The index to count from and the one to stop before.
     * @internal
     */
    private _getRootBounds;
    /**
     * Counts the visible items placed before an item within its parent branch.
     * @param item - The item to locate.
     * @param start - The index the top level items are counted from, set by a range.
     * @param end - The index the top level items are counted up to, set by a range.
     * @returns The index of the item within its branch, or `-1` if the branch doesn't hold it.
     * @internal
     */
    private _getBranchVisibleIndex;
    /**
     * Counts the visible items placed before an item in the flat list of the visible items: at
     * every level the branches of the preceding siblings are counted together with the parent
     * item itself.
     * @param item - The item to locate.
     * @param start - The index the top level items are counted from, set by a range.
     * @returns The index of the item in the flat list, or `-1` if the tree doesn't hold it.
     * @internal
     */
    private _getFlatVisibleIndex;
    /**
     * Counts the rows an item takes in the flat list of the visible items: the item itself plus
     * the visible items of its branch while it is expanded.
     * @param item - The item to measure.
     * @returns The number of the visible rows, `0` for a hidden item.
     * @internal
     */
    private _getVisibleCount;
    protected flatten(input: T[]): T[];
    protected _add({ newItem, index, parent, order, batch, }: {
        newItem: IDataItem;
        batch: IDataItem[];
        index: number;
        parent: Id;
        order?: number;
    }): Id;
    protected _setParent(item: IDataItem, parent: Id): void;
    protected _copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id, key?: number): Id;
    protected _move(id: Id, index: number, target?: ITreeCollection | IDataCollection, targetId?: Id, key?: number): Id;
    /**
     * Changes the id of a data item. The root id can't be changed.
     * @param id - The current id of the item.
     * @param newId - The new id for the item. If omitted, a unique id is generated automatically.
     * @param silent - If true, the change event is not fired.
     * @returns The new id of the item, or the original id if the change was rejected.
     */
    changeId(id: Id, newId?: Id, silent?: boolean): Id;
    protected _changeIdCore(id: Id, newId: Id): void;
    protected _moveItem(id: any, targetId: any, index: any): void;
    protected _reset(config: {
        id?: Id;
        grouping: any;
    }): void;
    protected _removeCore(id: Id): void;
    private _removeFromParentList;
    private _removeChildren;
    private _removeFromOrders;
    protected _addToOrder(_order: any, obj: any, index: number): void;
    protected _parse_data(data: any, parent?: Id): void;
    protected _parseItem(item: any): void;
    private _recursiveFilter;
    private _serialize;
    /**
     * Narrows the tree by a single rule, keeping the parent chain of every matched item
     * and remembering the unfiltered tree on first use.
     * @param rule - The rule to apply. A missing or empty rule is a no-op.
     * @param config - Options that control which items the rule is matched against.
     * @throws If the rule is neither a predicate nor a valid field/value pair.
     * @internal
     */
    private _applyFilter;
    /**
     * Recomputes every group header from the items the tree holds now, and drops the groups that
     * ended up with nothing in them unless `showEmptyGroups` is set. See
     * {@link TreeCollection._dropGroups} for what dropping a header costs it.
     * @internal
     */
    protected _recalculateGroups(): void;
    /**
     * Counts the items every group header holds in a given tree, its whole subtree and not just
     * the direct children. Summary rows are not items.
     * @param store - The parent to children map to count over.
     * @returns The counts, keyed by header id.
     * @internal
     */
    private _countTreeGroups;
    /**
     * Takes group headers out of the tree together with everything below them, their summary rows
     * included. While a filter is applied the headers only leave `_children`, because `_initChildren`
     * keeps the whole grouped tree and resetting the filter has to bring them back. Without a filter
     * there is nothing to restore them from, so they leave the tree for good.
     * @param ids - Ids of the headers to drop.
     * @internal
     */
    protected _dropGroups(ids: Set<string>): void;
    /**
     * Unwraps the stored filters into their bare rules, keeping them keyed by filter id.
     * Unlike {@link DataCollection._normalizeFilters} it does not turn the rules into predicates:
     * {@link TreeCollection._applyFilter} needs the original rule to walk the tree, and it needs the
     * id to look the matching config up.
     * @param filters - The stored filters.
     * @returns The bare rules, keyed by filter id.
     * @internal
     */
    protected _normalizeFilters(filters: any): any;
    protected _checkFilterRule(rule: IFilterMode | IFilterComplexMode | IFilterCallback): boolean;
    /**
     * Drops the sorting rules and rebuilds the tree in the order it had before sorting.
     * If filtering was applied on top of the sorting, it is reapplied to the restored tree.
     * @internal
     */
    protected _resetSorting(): void;
    /**
     * Reorders the children of every parent by all currently stored sorting rules.
     * @internal
     */
    protected _applySorters(): void;
}
