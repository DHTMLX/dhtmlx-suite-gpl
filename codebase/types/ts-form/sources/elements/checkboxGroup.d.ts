import { Layout } from "../../../ts-layout";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ItemEvent, ValidationStatus, IBaseLayoutItem, IBaseItem, IBaseState, IGroup, ILabel, IMessage, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export interface ICheckboxGroupValue {
    [id: string]: boolean | string;
}
export interface ICheckboxGroupItemProps extends IBaseLayoutItem {
    id?: string;
    checked?: boolean;
    value?: string;
    text?: string;
}
export interface ICheckboxGroupItemConfig extends IBaseItem, IBaseState, ICheckboxGroupItemProps {
    type: "checkbox";
    $validationStatus?: ValidationStatus;
    $group?: boolean;
}
export interface ICheckboxGroupOption extends IGroup {
    rows?: ICheckboxGroupItemConfig[];
    cols?: ICheckboxGroupItemConfig[];
}
export interface ICheckboxGroupProps extends IBaseLayoutItem, ILabel, IMessage {
    options?: ICheckboxGroupOption;
}
export interface ICheckboxGroupConfig extends IBaseItem, IBaseState, ICheckboxGroupProps {
    type: "checkboxgroup";
    value?: ICheckboxGroupValue;
    $validationStatus?: ValidationStatus;
}
export interface ICheckboxGroup {
    parent?: IFieldset;
    config: ICheckboxGroupConfig;
    events: IEventSystem<ItemEvent, ICheckboxGroupEventHandlersMap>;
    destructor(): void;
    getValue(): ICheckboxGroupValue;
    getValue(id: string): string | boolean;
    getValue(id?: string): ICheckboxGroupValue | string | boolean;
    setValue(value: ICheckboxGroupValue): void;
    focus(id?: string): void;
    blur(): void;
    show(id?: string): void;
    hide(id?: string, init?: boolean): void;
    isVisible(id?: string): boolean;
    disable(id?: string): void;
    enable(id?: string): void;
    isDisabled(id?: string): boolean;
    clear(): void;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    isChecked(id?: string): boolean | {
        [key: string]: boolean;
    };
    getProperties(id?: string): ICheckboxGroupProps | ICheckboxGroupItemProps;
    setProperties(arg?: string | ICheckboxGroupProps, props?: ICheckboxGroupItemProps): void;
}
export interface ICheckboxGroupEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: ICheckboxGroupValue) => boolean | void;
    [ItemEvent.change]: (value: ICheckboxGroupValue) => void;
    [ItemEvent.focus]: (value: ICheckboxGroupValue, id: string) => void;
    [ItemEvent.blur]: (value: ICheckboxGroupValue, id: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string) => void;
    [ItemEvent.beforeHide]: (value: ICheckboxGroupValue, id?: string, init?: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: ICheckboxGroupValue, id?: string) => boolean | void;
    [ItemEvent.afterHide]: (value: ICheckboxGroupValue, id?: string, init?: boolean) => void;
    [ItemEvent.afterShow]: (value: ICheckboxGroupValue, id?: string) => void;
    [ItemEvent.beforeValidate]: (value: ICheckboxGroupValue) => boolean | void;
    [ItemEvent.afterValidate]: (value: ICheckboxGroupValue, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ICheckboxGroupProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ICheckboxGroupProps) => void;
}
export declare class CheckboxGroup extends Label implements ICheckboxGroup {
    parent: IFieldset;
    config: ICheckboxGroupConfig;
    layout: Layout;
    events: IEventSystem<ItemEvent, ICheckboxGroupEventHandlersMap>;
    private _buttons;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: any, config: ICheckboxGroupConfig);
    destructor(): void;
    setProperties(arg?: string | ICheckboxGroupProps, props?: ICheckboxGroupItemProps): void;
    getProperties(id?: string): ICheckboxGroupProps | ICheckboxGroupItemProps;
    getValue(): ICheckboxGroupValue;
    getValue(id: string): string | boolean;
    setValue(newValue: ICheckboxGroupValue): void;
    isChecked(id?: string): boolean | {
        [key: string]: boolean;
    };
    focus(id?: string): void;
    blur(): void;
    show(id?: string): void;
    hide(id?: string, init?: boolean): void;
    isVisible(id?: string): boolean;
    enable(id?: string): void;
    disable(id?: string, init?: boolean): void;
    isDisabled(id?: string): boolean;
    clear(): void;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    protected _initView(config: ICheckboxGroupConfig): void;
    protected _initHandlers(): void;
    protected _draw(): any;
}
