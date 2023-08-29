import { Combobox } from "../../../ts-combobox";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ValidationStatus, ItemEvent, ILabel, IBaseLayoutItem, IMessage, IBaseState, IBaseItem, IBaseHandlersMap } from "../types";
import { Id } from "../../../ts-common/types";
import { IFieldset } from "./fieldset";
export declare type ValidationComboFn = (input: Id | Id[], text: string | string[]) => boolean;
export interface IComboProps extends IBaseLayoutItem, ILabel, IMessage {
    readOnly?: boolean;
    validation?: ValidationComboFn;
    template?: (item: any) => string;
    filter?: (item: any, input: string) => boolean;
    multiselection?: boolean;
    placeholder?: string;
    selectAllButton?: boolean;
    itemsCount?: boolean | ((count: number) => string);
    itemHeight?: number | string;
    virtual?: boolean;
    listHeight?: number | string;
    newOptions?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    readonly?: boolean;
}
export interface IComboConfig extends IBaseItem, IBaseState, IComboProps {
    type: "combo";
    value?: Id | Id[];
    data?: any[];
    $validationStatus?: ValidationStatus;
}
export interface ICombo {
    parent?: IFieldset;
    config: IComboConfig;
    combobox: Combobox;
    events: IEventSystem<ItemEvent, IComboEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: Id | Id[]): boolean;
    clearValidate(): void;
    setValue(value: Id | Id[]): void;
    getValue(): Id | Id[];
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Combobox;
    setProperties(propertyConfig: IComboProps): void;
    getProperties(): IComboProps;
}
export interface IComboEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: Id | Id[]) => boolean | void;
    [ItemEvent.change]: (value: Id | Id[]) => void;
    [ItemEvent.focus]: (value: Id | Id[]) => void;
    [ItemEvent.blur]: (value: Id | Id[]) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: Id | undefined) => void;
    [ItemEvent.beforeHide]: (value: Id | Id[], init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: Id | Id[]) => boolean | void;
    [ItemEvent.afterHide]: (value: Id | Id[], init: boolean) => void;
    [ItemEvent.afterShow]: (value: Id | Id[]) => void;
    [ItemEvent.beforeValidate]: (value: Id | Id[]) => boolean | void;
    [ItemEvent.afterValidate]: (value: Id | Id[], isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IComboProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IComboProps) => void;
}
export declare class Combo extends Label implements ICombo {
    parent: IFieldset;
    config: IComboConfig;
    combobox: Combobox;
    events: IEventSystem<ItemEvent, IComboEventHandlersMap>;
    private _isValid;
    private _propsItem;
    private _propsCombo;
    private _props;
    constructor(container: any, config: IComboConfig);
    destructor(): void;
    setProperties(propertyConfig: IComboProps): void;
    getProperties(): IComboProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    clear(): void;
    getValue(): Id | Id[];
    setValue(value: Id | Id[]): void;
    validate(silent?: boolean, validateValue?: Id | Id[]): boolean;
    clearValidate(): void;
    getWidget(): Combobox;
    focus(): void;
    blur(): void;
    protected _initView(config: IComboConfig): void;
    protected _initHandlers(): void;
    protected _validationStatus(): any;
    protected _getRootView(): any;
    protected _draw(): any;
    private _exsistData;
    private _getItemText;
}
