import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, ILabel, IMessage, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export declare type ValidationSelectFn = (input: string | number | boolean) => boolean;
export interface IOption {
    value: string | number;
    content: string;
    disabled?: boolean;
}
export interface ISelectProps extends IBaseLayoutItem, ILabel, IMessage {
    validation?: ValidationSelectFn;
    icon?: string;
    required?: boolean;
}
export interface ISelectConfig extends IBaseItem, IBaseState, ISelectProps {
    type: "select";
    options: IOption[];
    value?: string | number;
    $validationStatus?: ValidationStatus;
}
export interface ISelect {
    parent?: IFieldset;
    config: ISelectConfig;
    events: IEventSystem<ItemEvent, ISelectEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(value?: string | number): void;
    enable(value?: string | number): void;
    isDisabled(value?: string | number): boolean;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    setValue(value: string | number): void;
    getValue(): string | number;
    setOptions(options: IOption[]): void;
    getOptions(): IOption[];
    focus(): void;
    blur(): void;
    clear(): void;
    setProperties(propertyConfig: ISelectProps): void;
    getProperties(): ISelectProps;
}
export interface ISelectEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string | number) => boolean | void;
    [ItemEvent.change]: (value: string | number) => void;
    [ItemEvent.focus]: (value: string | number) => void;
    [ItemEvent.blur]: (value: string | number) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.beforeChangeOptions]: (options: IOption[]) => boolean | void;
    [ItemEvent.changeOptions]: (options: IOption[]) => void;
    [ItemEvent.beforeHide]: (value: string | number, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | number) => boolean | void;
    [ItemEvent.afterHide]: (value: string | number, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | number) => void;
    [ItemEvent.beforeValidate]: (value: string | number) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | number, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ISelectProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ISelectProps) => void;
}
export declare class Select extends Label implements ISelect {
    parent: IFieldset;
    config: ISelectConfig;
    events: IEventSystem<ItemEvent, ISelectEventHandlersMap>;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: any, config: ISelectConfig);
    destructor(): void;
    setProperties(propertyConfig: ISelectProps): void;
    getProperties(): ISelectProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(value?: string | number): void;
    enable(value?: string | number): void;
    isDisabled(value?: string | number): boolean;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    clear(): void;
    setValue(value: string | number): void;
    focus(): void;
    blur(): void;
    getValue(): string | number;
    setOptions(options: IOption[]): void;
    getOptions(): IOption[];
    protected _initView(config: ISelectConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        onchange: (e: Event) => void;
        onblur: () => void;
        onfocus: () => void;
    };
    protected _draw(): any;
    private _checkOptions;
}
