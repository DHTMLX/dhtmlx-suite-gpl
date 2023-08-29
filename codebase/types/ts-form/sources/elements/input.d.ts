import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, ILabel, IMessage, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
import { ITextProps, ITextConfig } from "./textinput";
import { ITextAreaConfig } from "./textarea";
export declare enum Validation {
    empty = "",
    validEmail = "email",
    validInteger = "integer",
    validNumeric = "numeric",
    validAlphaNumeric = "alphanumeric",
    validIPv4 = "IPv4"
}
export declare type ValidationInputFn = (input: string | number) => boolean;
export interface IInputProps extends IBaseLayoutItem, ILabel, IMessage {
    inputType?: "text" | "password" | "number";
    validation?: Validation | ValidationInputFn;
    icon?: string;
    placeholder?: string;
    autocomplete?: boolean;
    readOnly?: boolean;
    maxlength?: number | string;
    minlength?: number | string;
    min?: number | string;
    max?: number | string;
    step?: number | string;
}
export interface IInputConfig extends IBaseItem, IBaseState, IInputProps {
    type: "input";
    value?: string | number;
    $validationStatus?: ValidationStatus;
}
export interface IInput {
    parent?: IFieldset;
    config: IInputConfig;
    events: IEventSystem<ItemEvent, IInputEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | number): boolean;
    clearValidate(): void;
    setValue(value: string | number): void;
    getValue(): string | number;
    focus(): void;
    blur(): void;
    clear(): void;
    setProperties(propertyConfig: IInputProps): void;
    getProperties(): IInputProps;
}
export interface IInputEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string | number) => boolean | void;
    [ItemEvent.change]: (value: string | number) => void;
    [ItemEvent.focus]: (value: string | number) => void;
    [ItemEvent.blur]: (value: string | number) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.input]: (value: string | number) => void;
    [ItemEvent.beforeHide]: (value: string | number, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | number) => boolean | void;
    [ItemEvent.afterHide]: (value: string | number, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | number) => void;
    [ItemEvent.beforeValidate]: (value: string | number) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | number, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IInputProps | ITextProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IInputProps | ITextProps) => void;
}
export declare class Input extends Label implements IInput {
    parent: IFieldset;
    config: IInputConfig;
    events: IEventSystem<ItemEvent, IInputEventHandlersMap>;
    protected _propsItem: string[];
    protected _props: string[];
    private _isValid;
    private _value;
    constructor(container: HTMLElement | string, config?: {});
    destructor(): void;
    setProperties(propertyConfig: IInputProps): void;
    getProperties(): IInputProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | number): boolean;
    clearValidate(): void;
    clear(): void;
    setValue(value: string | number): void;
    getValue(): string | number;
    focus(): void;
    blur(): void;
    protected _initView(config: IInputConfig | ITextConfig | ITextAreaConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        oninput: (e: Event) => void;
        onchange: (e: Event) => void;
        onfocus: () => void;
        onblur: () => void;
        onkeydown: (event: KeyboardEvent) => void;
    };
    protected _draw(): any;
}
