import { VNode } from "../../ts-common/dom";
import { List } from "../../ts-list";
import { Id, IHandlers } from "../../ts-common/types";
import { IDataViewConfig, IDataView } from "./types";
export declare class DataView extends List implements IDataView {
    config: IDataViewConfig;
    constructor(node: HTMLElement | string, config?: IDataViewConfig);
    showItem(id: Id): void;
    protected _didRedraw(vm: any): void;
    protected _renderItem(item: any, index: number): VNode;
    protected _renderList(): VNode;
    protected _getHotkeys(): IHandlers;
    protected getDataViewItemAriaAttrs(context: this, item: any): {
        "aria-roledescription": string;
        "aria-grabbed": string;
        role: string;
        "aria-selected": string;
    } | {
        "aria-roledescription"?: undefined;
        "aria-grabbed": string;
        role: string;
        "aria-selected": string;
    } | {
        "aria-roledescription": string;
        "aria-grabbed"?: undefined;
        role: string;
        "aria-selected": string;
    } | {
        "aria-roledescription"?: undefined;
        "aria-grabbed"?: undefined;
        role: string;
        "aria-selected": string;
    };
    protected getDataViewAriaAttrs(config: any, itemsCount: any, rowsCount: any, itemsInRow: any): {
        role: string;
        "aria-label": string;
        "aria-multiselectable": string;
        "aria-readonly": string;
    };
}
