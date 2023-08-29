import { Layout } from "../../../ts-layout";
import { Popup } from "../../../ts-popup";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ValidationStatus, ItemEvent, IBaseState, IBaseLayoutItem, IGroup, ILabel, IMessage, IBaseItem, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export interface IRadioButtonProps extends IBaseState, IBaseLayoutItem {
    id?: string;
    checked?: boolean;
    value?: string;
    text?: string;
}
export interface IRadioButtonConfig extends IRadioButtonProps {
    type: "radiobutton";
    $name?: string;
    $required?: boolean;
    $validationStatus?: ValidationStatus;
    $group?: boolean;
}
export interface IRadioGroupOption extends IGroup {
    rows?: IRadioButtonConfig[];
    cols?: IRadioButtonConfig[];
}
export interface IRadioGroupProps extends IBaseLayoutItem, ILabel, IMessage {
    required?: boolean;
    options?: IRadioGroupOption;
}
export interface IRadioGroupConfig extends IBaseItem, IBaseState, IRadioGroupProps {
    type: "radiogroup";
    value?: string;
    $validationStatus?: ValidationStatus;
}
export interface IRadioGroup {
    parent?: IFieldset;
    config: IRadioGroupConfig;
    layout: Layout;
    events: IEventSystem<ItemEvent, IRadioGroupEventHandlersMap>;
    destructor(): void;
    getValue(): string;
    setValue(value: string): void;
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
    getProperties(id?: string): IRadioButtonProps | IRadioGroupProps;
    setProperties(arg?: string | IRadioGroupProps, props?: IRadioButtonProps): void;
}
export interface IRadioGroupEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string) => boolean | void;
    [ItemEvent.change]: (value: string) => void;
    [ItemEvent.focus]: (value: string, id: string) => void;
    [ItemEvent.blur]: (value: string, id: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string) => void;
    [ItemEvent.beforeHide]: (value: string, id?: string, init?: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string, id?: string) => boolean | void;
    [ItemEvent.afterHide]: (value: string, id?: string, init?: boolean) => void;
    [ItemEvent.afterShow]: (value: string, id?: string) => void;
    [ItemEvent.beforeValidate]: (value: string) => boolean | void;
    [ItemEvent.afterValidate]: (value: string, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IRadioGroupProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IRadioGroupProps) => void;
}
export declare class RadioGroup extends Label implements IRadioGroup {
    parent: IFieldset;
    config: IRadioGroupConfig;
    layout: Layout;
    events: IEventSystem<ItemEvent, IRadioGroupEventHandlersMap>;
    protected _handlers: any;
    protected _helper: Popup;
    private _buttons;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: any, config: IRadioGroupConfig);
    destructor(): void;
    setProperties(arg?: string | IRadioGroupProps, props?: IRadioButtonProps): void;
    getProperties(id?: string): IRadioGroupProps | IRadioButtonProps;
    getValue(): string;
    setValue(value: string): void;
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
    protected _initView(config: IRadioGroupConfig): void;
    protected _initHandlers(): void;
    protected _draw(): any;
    private _setValue;
}
