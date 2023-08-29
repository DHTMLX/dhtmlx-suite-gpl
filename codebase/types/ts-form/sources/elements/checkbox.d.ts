import { IEventSystem } from "../../../ts-common/events";
import { Popup } from "../../../ts-popup";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, IMessage, ILabel, IBaseState, IBaseItem, IBaseHandlersMap } from "../types";
import { Label } from "./helper/label";
import { IFieldset } from "./fieldset";
export interface ICheckboxProps extends IBaseLayoutItem, ILabel, IMessage {
    text?: string;
}
export interface ICheckboxConfig extends ICheckboxProps, IBaseState, IBaseItem {
    type: "checkbox";
    checked?: boolean;
    value?: string;
    $group?: boolean;
    $required?: boolean;
    $validationStatus?: ValidationStatus;
}
export interface ICheckbox {
    parent?: IFieldset;
    config: ICheckboxConfig;
    events: IEventSystem<ItemEvent, ICheckboxEventHandlersMap>;
    destructor(): void;
    getValue(): string | boolean;
    setValue(checked: boolean): void;
    focus(): void;
    blur(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    clear(): void;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    isChecked(): boolean;
    setProperties(propertyConfig: ICheckboxProps, silent?: boolean): void;
    getProperties(): ICheckboxProps;
}
export interface ICheckboxEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string | boolean) => boolean | void;
    [ItemEvent.change]: (value: string | boolean) => void;
    [ItemEvent.focus]: (value: string | boolean, id?: string) => void;
    [ItemEvent.blur]: (value: string | boolean, id?: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id?: string) => void;
    [ItemEvent.beforeHide]: (value: string | boolean, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | boolean) => boolean | void;
    [ItemEvent.afterHide]: (value: string | boolean, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | boolean) => void;
    [ItemEvent.beforeValidate]: (value: string | boolean) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | boolean, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ICheckboxProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ICheckboxProps) => void;
}
export declare class Checkbox extends Label implements ICheckbox {
    parent: IFieldset;
    config: ICheckboxConfig;
    events: IEventSystem<ItemEvent, ICheckboxEventHandlersMap>;
    protected _handlers: any;
    protected _helper: Popup;
    private _inGroup;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: HTMLElement | string, config?: {});
    setProperties(propertyConfig: ICheckboxProps, silent?: boolean): void;
    getProperties(): ICheckboxProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    setValue(checked: boolean, silent?: boolean): void;
    getValue(): string | boolean;
    clear(silent?: boolean): void;
    destructor(): void;
    focus(): void;
    blur(): void;
    isChecked(): boolean;
    private _getValue;
    private _initView;
    protected _initHandlers(): void;
    protected _draw(): any;
}
