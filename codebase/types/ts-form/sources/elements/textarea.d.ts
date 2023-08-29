import { Input, IInputProps } from "./input";
import { ItemEvent, ValidationFn, IBaseItem, IBaseState, IBaseLayoutItem, ILabel, IMessage, ValidationStatus, IBaseHandlersMap } from "../types";
import { IEventSystem } from "../../../ts-common/events";
import { IFieldset } from "./fieldset";
export interface ITextAreaProps extends IBaseLayoutItem, ILabel, IMessage {
    validation?: ValidationFn;
    placeholder?: string;
    readOnly?: boolean;
    maxlength?: number | string;
    minlength?: number | string;
    resizable?: boolean;
}
export interface ITextAreaConfig extends IBaseItem, IBaseState, ITextAreaProps {
    type: "textarea";
    value?: string;
    $validationStatus?: ValidationStatus;
}
export interface ITextArea {
    parent?: IFieldset;
    config: ITextAreaConfig;
    events: IEventSystem<ItemEvent, ITextAreaEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | number): boolean;
    clearValidate(): void;
    setValue(value: string): void;
    getValue(): string;
    focus(): void;
    blur(): void;
    clear(): void;
    setProperties(propertyConfig: ITextAreaProps): void;
    getProperties(): ITextAreaProps;
}
export interface ITextAreaEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string) => boolean | void;
    [ItemEvent.change]: (value: string) => void;
    [ItemEvent.focus]: (value: string) => void;
    [ItemEvent.blur]: (value: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.input]: (value: string) => void;
    [ItemEvent.beforeHide]: (value: string, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string) => boolean | void;
    [ItemEvent.afterHide]: (value: string, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string) => void;
    [ItemEvent.beforeValidate]: (value: string) => boolean | void;
    [ItemEvent.afterValidate]: (value: string, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ITextAreaProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ITextAreaProps) => void;
}
export declare class Textarea extends Input implements ITextArea {
    config: ITextAreaConfig & {
        type: any;
        validation: any;
    };
    events: IEventSystem<ItemEvent, ITextAreaEventHandlersMap>;
    protected _propsItem: string[];
    protected _props: string[];
    getValue(): string;
    focus(): void;
    blur(): void;
    setProperties(propertyConfig: ITextAreaProps & IInputProps): void;
    getProperties(): ITextAreaProps & IInputProps;
    protected _initView(config: ITextAreaConfig): void;
    protected _draw(): any;
}
