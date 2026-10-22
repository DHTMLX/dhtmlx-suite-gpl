import { IExtendedGrid, IProGrid } from "../types";
import { ICellContent, IComboFilterConfig, IHeaderFilter, IInputFilterConfig, ISelectFilterConfig } from "./content";
import { VNode } from "../../../ts-common/dom";
import { Calendar, ICalendarConfig } from "../../../ts-calendar";
import { Combobox } from "../../../ts-combobox";
export { IComboFilterConfig, IInputFilterConfig, ISelectFilterConfig } from "./content";
export interface IDateFilterConfig extends Omit<ICalendarConfig, "value" | "css" | "$rangeMark"> {
    icon?: string;
    placeholder?: string;
    asDateObject?: boolean;
}
export interface IProHeaderFilter extends Omit<IHeaderFilter, "value" | "filterConfig"> {
    value: string | string[] | Date | Date[];
    filterConfig?: IComboFilterConfig | IDateFilterConfig | IInputFilterConfig | ISelectFilterConfig;
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
