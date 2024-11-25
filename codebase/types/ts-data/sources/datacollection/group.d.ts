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
    field?: string;
}
export interface IGroup {
    group(order: TGroupOrder[], arr: IDataItem[], config: IGroupConfig): IDataItem[];
    ungroup(arr?: IDataItem[]): IDataItem[];
    isGrouped(): boolean;
    getGroupedFields(): string[];
    getGroupConfig(config?: IGroupConfig): IGroupConfig;
}
export declare class Group implements IGroup {
    private _init;
    private _config;
    private _groupSet;
    constructor();
    group(order: TGroupOrder[], arr: IDataItem[], config?: IGroupConfig): IDataItem[];
    ungroup(modifiedData?: IDataItem[]): IDataItem[];
    isGrouped(): boolean;
    getGroupedFields(): string[];
    getGroupConfig(config?: IGroupConfig): IGroupConfig;
    private _group;
    private _addSummaryRow;
    private _toAggregate;
    private _getOrderConfig;
}
