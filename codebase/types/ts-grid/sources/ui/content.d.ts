import { VNode } from "../../../ts-common/dom";
import { ICol, IExtendedGrid, IGrid, IProGrid, IRendererConfig } from "../types";
import { DataCollection, IDataItem } from "../../../ts-data";
import { Combobox } from "../../../ts-combobox";
import { IEventSystem } from "../../../ts-common/events";
import { Id } from "../../../ts-common/types";
export interface IComboFilterConfig {
    template?: (item: IDataItem) => string;
    filter?: (item: IDataItem, input: string) => boolean;
    data?: DataCollection<IDataItem> | IDataItem[];
    placeholder?: string;
    readonly?: boolean;
    virtual?: boolean;
    multiselection?: boolean;
}
export interface IInputFilterConfig {
    placeholder?: string;
    icon?: string;
}
export declare enum HeaderFilterEvent {
    change = "change"
}
export interface IHeaderFilter {
    column: ICol;
    config: IRendererConfig;
    value: string | string[];
    events: IEventSystem<HeaderFilterEvent>;
    data?: string[] | IDataItem[];
    id?: Id;
    filterConfig?: IComboFilterConfig | IInputFilterConfig;
    getFilter(): VNode | Combobox;
    setValue(value: string | string[], silent?: boolean): void;
    clear(silent?: boolean): void;
    focus(): void;
    blur(): void;
}
export interface ICellContent {
    toHtml: (column: ICol, config: IRendererConfig) => VNode;
    match?: (obj: IMatch) => boolean;
    destructor?: () => void;
    element?: Record<string, IHeaderFilter>;
    value?: Record<string, string>;
}
interface IMatch {
    val: number | string | Date;
    match: string | string[] | Date | Date[];
    obj: IDataItem;
    col?: ICol;
    multi?: boolean;
}
export interface IContentList {
    [key: string]: ICellContent;
}
export declare function getContent(grid: IGrid | IProGrid | IExtendedGrid): IContentList;
export {};
