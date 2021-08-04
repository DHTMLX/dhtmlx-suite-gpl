import { Id } from "../../ts-common/types";
import { DataCollection } from "../../ts-data";
export declare type ILabelPosition = "left" | "top";
export interface IComboboxConfig {
    data?: DataCollection<any> | any[];
    disabled?: boolean;
    readOnly?: boolean;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    multiselection?: boolean;
    label?: string;
    labelPosition?: ILabelPosition;
    labelWidth?: string | number;
    placeholder?: string;
    selectAllButton?: boolean;
    itemsCount?: boolean | ((count: number) => string);
    itemHeight?: number | string;
    virtual?: boolean;
    listHeight?: number | string;
    required?: boolean;
    helpMessage?: string;
    hiddenLabel?: boolean;
    css?: string;
    value?: string | string[];
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    cellHeight?: number;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    help?: string;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    showItemsCount?: boolean | ((count: number) => string);
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    labelInline?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    readonly?: boolean;
}
export interface IComboFilterConfig {
    data?: DataCollection<any> | any[];
    readonly?: boolean;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    placeholder?: string;
    virtual?: boolean;
    multiselection?: boolean;
}
export declare enum ComboboxEvents {
    change = "change",
    focus = "focus",
    blur = "blur",
    keydown = "keydown",
    input = "input",
    beforeOpen = "beforeOpen",
    afterOpen = "afterOpen",
    beforeClose = "beforeClose",
    afterClose = "afterClose",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    open = "open",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    close = "close"
}
export interface IComboboxEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [ComboboxEvents.change]: (ids: Id | Id[]) => void;
    [ComboboxEvents.focus]: () => void;
    [ComboboxEvents.blur]: () => void;
    [ComboboxEvents.keydown]: (event: KeyboardEvent, id: Id | undefined) => void;
    [ComboboxEvents.input]: (value: string) => void;
    [ComboboxEvents.beforeOpen]: () => boolean | void;
    [ComboboxEvents.afterOpen]: () => void;
    [ComboboxEvents.beforeClose]: () => boolean | void;
    [ComboboxEvents.afterClose]: () => void;
    [ComboboxEvents.open]: () => void;
    [ComboboxEvents.close]: () => void;
}
export interface ICombobox {
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    destructor(): void;
    paint(): void;
    clear(): void;
    focus(): void;
    blur(): void;
    getValue(asArray?: boolean): Id[] | string;
    setValue(ids: Id[] | Id): void;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    setState(state: State): void;
}
export declare enum ComboState {
    default = 0,
    error = 1,
    success = 2
}
/** @deprecated See a documentation: https://docs.dhtmlx.com/ */
export declare type State = "success" | "error" | "default";
