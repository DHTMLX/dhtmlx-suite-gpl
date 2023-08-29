import { ITimeObject, Timepicker } from "../../../ts-timepicker";
import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, ILabel, IMessage, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export declare type ValidationTimepickerFn = (input: string | ITimeObject) => boolean;
export interface ITimePickerProps extends IBaseLayoutItem, ILabel, IMessage {
    editable?: boolean;
    validation?: ValidationTimepickerFn;
    icon?: string;
    placeholder?: string;
    timeFormat?: 12 | 24;
    controls?: boolean;
    valueFormat?: "string" | "timeObject";
}
export interface ITimePickerConfig extends IBaseItem, IBaseState, ITimePickerProps {
    type: "timepicker";
    value?: Date | number | string | any[] | ITimeObject;
    $validationStatus?: ValidationStatus;
}
export interface ITimePicker {
    parent?: IFieldset;
    config: ITimePickerConfig;
    timepicker: Timepicker;
    events: IEventSystem<ItemEvent, ITimePickerEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string): boolean;
    clearValidate(): void;
    setValue(value: Date | number | string | any[] | ITimeObject): void;
    getValue<T extends boolean = false>(asOBject?: T): T extends true ? ITimeObject : string;
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Timepicker;
    setProperties(propertyConfig: ITimePickerProps): void;
    getProperties(): ITimePickerProps;
}
export interface ITimePickerEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string | ITimeObject) => boolean | void;
    [ItemEvent.change]: (value: string | ITimeObject) => void;
    [ItemEvent.focus]: (value: string | ITimeObject) => void;
    [ItemEvent.blur]: (value: string | ITimeObject) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.input]: (inputValue: string) => void;
    [ItemEvent.beforeHide]: (value: string | ITimeObject, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | ITimeObject) => boolean | void;
    [ItemEvent.afterHide]: (value: string | ITimeObject, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | ITimeObject) => void;
    [ItemEvent.beforeValidate]: (value: string | ITimeObject) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | ITimeObject, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ITimePickerProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ITimePickerProps) => void;
}
export declare class TimePicker extends Label implements ITimePicker {
    parent: IFieldset;
    config: ITimePickerConfig;
    timepicker: Timepicker;
    events: IEventSystem<ItemEvent, ITimePickerEventHandlersMap>;
    private _keyManager;
    private _popup;
    private _isValid;
    private _popupIsFocus;
    private _propsItem;
    private _propsTimepicker;
    private _props;
    constructor(container: any, config: ITimePickerConfig);
    destructor(): void;
    setProperties(propertyConfig: ITimePickerProps): void;
    getProperties(): ITimePickerProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | ITimeObject): boolean;
    clearValidate(): void;
    setValue(value: Date | number | string | any[] | ITimeObject): void;
    getValue(asOBject?: boolean): ITimeObject | string | any;
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Timepicker;
    protected _initView(config: ITimePickerConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        onfocus: () => void;
        onblur: () => void;
        oninput: (e: Event) => void;
    };
    protected _initHotkeys(): void;
    protected _draw(): any;
    private _clear;
    private _afterApply;
    private _applyTab;
    private _isTimeObject;
}
