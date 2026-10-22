import { IAnyObj, Id } from "../../../ts-common/types";
import { IDataItem } from "../types";
export type TGroupOrderFunc = (i: IDataItem) => string;
export type TAggregate = "sum" | "count" | "min" | "max" | "avg" | string;
export interface IGroupOrder {
    by: string | TGroupOrderFunc;
    map?: {
        [field: string]: [string, TAggregate] | ((i: IDataItem[]) => string | number);
    };
    summary?: "top" | "bottom";
}
export interface IGroupOrderConfig extends IGroupOrder {
    by: string;
}
export type TGroupOrder = string | TGroupOrderFunc | IGroupOrder;
export type TDisplayMode = "original" | "column" | "row";
export interface IGroupConfig {
    displayMode?: TDisplayMode;
    showMissed?: boolean | string;
    /**
     * Whether a group whose items are all filtered out stays in the data with a zero count.
     * Defaults to `false`, i.e. such a group is dropped.
     */
    showEmptyGroups?: boolean;
    field?: string;
}
export interface IGroup {
    group(order: TGroupOrder[], arr: IDataItem[], config: IGroupConfig): IDataItem[];
    ungroup(arr?: IDataItem[]): IDataItem[];
    isGrouped(): boolean;
    getGroupedFields(): string[];
    getGroupConfig(config?: IGroupConfig): IGroupConfig;
    recalculate(node: IDataItem, items: IDataItem[], count?: number, total?: number): IAnyObj;
    hasMap(id: Id): boolean;
}
export declare class Group implements IGroup {
    private _init;
    private _config;
    private _groupSet;
    private _groupOrderFields;
    private _nodes;
    constructor();
    group(order: TGroupOrder[], arr: IDataItem[], config?: IGroupConfig): IDataItem[];
    ungroup(modifiedData?: IDataItem[]): IDataItem[];
    isGrouped(): boolean;
    getGroupedFields(): string[];
    getGroupConfig(config?: IGroupConfig): IGroupConfig;
    recalculate(node: IDataItem, items: IDataItem[], count?: number, total?: number): IAnyObj;
    hasMap(id: Id): boolean;
    private _group;
    private _addSummaryRow;
    private _toAggregate;
    private _getOrderConfig;
}
