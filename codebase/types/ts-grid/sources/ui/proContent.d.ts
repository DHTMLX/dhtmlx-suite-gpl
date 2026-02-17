import { IExtendedGrid, IProGrid } from "../types";
import { ICellContent, IHeaderFilter } from "./content";
import { VNode } from "../../../ts-common/dom";
import { DataCollection, IDataItem } from "../../../ts-data";
import { Calendar, ICalendarConfig } from "../../../ts-calendar";
import { Combobox } from "../../../ts-combobox";
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
export interface IDateFilterConfig extends Omit<ICalendarConfig, "value" | "css" | "$rangeMark"> {
    icon?: string;
    placeholder?: string;
    asDateObject?: boolean;
}
export interface IProHeaderFilter extends Omit<IHeaderFilter, "value" | "filterConfig"> {
    value: string | string[] | Date | Date[];
    filterConfig?: IComboFilterConfig | IDateFilterConfig | IInputFilterConfig;
    getFilter(): VNode | Combobox | Calendar;
    setValue(value: string | string[] | Date | Date[], silent?: boolean): void;
}
export interface IProCellContent extends Omit<ICellContent, "element"> {
    element?: Record<string, IProHeaderFilter>;
}
export interface IProContentList {
    [key: string]: IProCellContent;
}
export declare function getProContent(grid: IProGrid | IExtendedGrid): IProContentList;
