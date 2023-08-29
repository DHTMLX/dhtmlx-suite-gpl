import { Calendar, ViewMode } from "../../../ts-calendar";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ValidationStatus, ItemEvent, IBaseLayoutItem, ILabel, IMessage, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export declare type ValidationDateInput = (input: string | Date) => boolean;
export interface IDatePickerProps extends IBaseLayoutItem, ILabel, IMessage {
    editable?: boolean;
    validation?: ValidationDateInput;
    valueFormat?: IDatePickerValueFormat;
    icon?: string;
    placeholder?: string;
    mode?: ViewMode;
    mark?: (a: Date) => string;
    disabledDates?: (a: Date) => boolean;
    weekStart?: "monday" | "sunday";
    weekNumbers?: boolean;
    timePicker?: boolean;
    dateFormat?: string;
    timeFormat?: 24 | 12;
    thisMonthOnly?: boolean;
}
export declare type IDatePickerValueFormat = "string" | "Date";
export interface IDatePickerConfig extends IBaseItem, IBaseState, IDatePickerProps {
    type: "datepicker";
    value?: Date | string;
    $validationStatus?: ValidationStatus;
}
export interface IDatePicker {
    parent?: IFieldset;
    config: IDatePickerConfig;
    calendar: Calendar;
    events: IEventSystem<ItemEvent, IDatePickerEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | Date): boolean;
    clearValidate(): void;
    setValue(value: string | Date): void;
    getValue<T extends boolean = false>(asDateObject?: T): string | Date;
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Calendar;
    setProperties(propertyConfig: IDatePickerProps): void;
    getProperties(): IDatePickerProps;
}
export interface IDatePickerEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string | Date) => boolean | void;
    [ItemEvent.change]: (value: string | Date) => void;
    [ItemEvent.focus]: (value: string | Date) => void;
    [ItemEvent.blur]: (value: string | Date) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.input]: (inputValue: string) => void;
    [ItemEvent.beforeHide]: (value: string | Date, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | Date) => boolean | void;
    [ItemEvent.afterHide]: (value: string | Date, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | Date) => void;
    [ItemEvent.beforeValidate]: (value: string | Date) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | Date, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IDatePickerProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IDatePickerProps) => void;
}
export declare class DatePicker extends Label implements IDatePicker {
    parent: IFieldset;
    config: IDatePickerConfig;
    calendar: Calendar;
    events: IEventSystem<ItemEvent, IDatePickerEventHandlersMap>;
    private _keyManager;
    private _popup;
    private _isValid;
    private _popupIsFocus;
    private _propsItem;
    private _propsCalendar;
    private _props;
    constructor(container: any, config: IDatePickerConfig);
    destructor(): void;
    setProperties(propertyConfig: IDatePickerProps): void;
    getProperties(): IDatePickerProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | Date): boolean;
    clearValidate(): void;
    setValue(value: string | Date): void;
    getValue<T extends boolean = false>(asDateObject?: T): string | Date;
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Calendar;
    protected _initView(config: IDatePickerConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        onblur: () => void;
        onfocus: () => void;
        oninput: (e: Event) => void;
        onchange: (e: Event) => void;
    };
    protected _initHotkeys(): void;
    protected _draw(): any;
    private _applyTab;
}
