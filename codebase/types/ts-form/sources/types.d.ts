import { IComboboxConfig, Combobox } from "../../ts-combobox";
import { ICalendarConfig, Calendar, ViewMode } from "../../ts-calendar";
import { Direction, ISliderConfig, Slider } from "../../ts-slider";
import { ITimeObject, ITimepickerConfig, Timepicker } from "../../ts-timepicker";
import { IColorpickerConfig, Colorpicker, ViewsMode } from "../../ts-colorpicker";
import { IEventSystem } from "../../ts-common/events";
import { Layout } from "../../ts-layout";
import { IAnyObj, Id } from "../../ts-common/types";
import { DataCollection, IDataItem } from "../../ts-data";
import { FlexDirection } from "../../ts-common/html";
export interface IForm {
    config: IFormConfig;
    events: IEventSystem<FormEvents, IFormEventHandlersMap>;
    layout: Layout;
    paint(): void;
    destructor(): void;
    disable(): void;
    enable(): void;
    isDisabled(name?: string): boolean;
    show(): void;
    hide(): void;
    isVisible(name?: string): boolean;
    validate(silent?: boolean): boolean;
    send(url: string, method?: string, asFormData?: boolean): Promise<any> | void;
    clear(method?: ClearMethod): void;
    setValue(obj: FormData | IAnyObj): void;
    setFocus(name: string): void;
    blur(name: string): void;
    getValue(asFormData?: boolean): FormData | IAnyObj;
    getItem(name: string): any;
    forEach(callback: FormDataCallback): void;
    getProperties(name?: string): {
        [name: string]: IFormProps;
    } | IFormProps;
    setProperties(arg: string | {
        [name: string]: IFormProps;
    }, props?: IFormProps): void;
}
export declare type IFormProps = IBaseLayoutItem | ICheckboxProps | IColorpickerProps | IComboProps | IDatePickerProps | IInputProps | ISelectProps | ISliderProps | ITextProps | ITextAreaProps | ITimePickerProps | ICheckboxGroupProps;
export interface IBaseLayoutItem {
    width?: string | number | "content";
    height?: string | number | "content";
    padding?: string | number;
    css?: string;
}
export interface IBlockConfig extends IBaseLayoutItem {
    rows?: IBlock & any;
    cols?: IBlock & any;
    align?: FlexDirection;
    title?: string;
    gravity?: boolean;
}
export interface IFormConfig extends IBlockConfig {
    disabled?: boolean;
    hidden?: boolean;
}
export declare enum FormEvents {
    change = "change",
    click = "click",
    focus = "focus",
    blur = "blur",
    keydown = "keydown",
    beforeShow = "beforeShow",
    afterShow = "afterShow",
    beforeHide = "beforeHide",
    afterHide = "afterHide",
    afterValidate = "afterValidate",
    beforeValidate = "beforeValidate",
    beforeChangeProperties = "beforeChangeProperties",
    afterChangeProperties = "afterChangeProperties",
    beforeSend = "beforesend",
    afterSend = "aftersend",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    buttonClick = "buttonClick",
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    validationFail = "validationfail"
}
export interface IFormEventHandlersMap {
    [key: string]: (...args: any[]) => any;
    [FormEvents.change]: (name: string, value: any) => void;
    [FormEvents.click]: (name: string, event: Event) => void;
    [FormEvents.focus]: (name: string, value: any, id?: string) => void;
    [FormEvents.blur]: (name: string, value: any, id?: string) => void;
    [FormEvents.keydown]: (event: KeyboardEvent, name: string, id?: string) => void;
    [FormEvents.beforeHide]: (name: string, value?: any) => boolean | void;
    [FormEvents.afterHide]: (name: string, value?: any) => void;
    [FormEvents.beforeShow]: (name: string, value?: any) => boolean | void;
    [FormEvents.afterShow]: (name: string, value?: any) => void;
    [FormEvents.beforeValidate]: (name: string, value: any) => boolean | void;
    [FormEvents.afterValidate]: (name: string, value: any, isValid: boolean) => void;
    [FormEvents.beforeChangeProperties]: (name: string, props: any) => boolean | void;
    [FormEvents.afterChangeProperties]: (name: string, props: any) => void;
    [FormEvents.beforeSend]: () => boolean;
    [FormEvents.afterSend]: () => void;
    [FormEvents.buttonClick]: (name: string, event: Event) => any;
    [FormEvents.validationFail]: (id: string, component: any) => any;
}
export declare type FormItemType = "input" | "button" | "combo" | "slider" | "radiobutton" | "radiogroup" | "checkbox" | "checkboxgroup" | "select" | "simplevault" | "textarea" | "timepicker" | "datepicker" | "colorpicker" | "text" | "spacer" | "container";
export interface IItem extends IBaseLayoutItem {
    type?: FormItemType;
    name?: string;
    id?: string;
    disabled?: boolean;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    gravity?: boolean;
    hidden?: boolean;
    $validationStatus?: ValidationStatus;
}
export interface IInputProps extends IBaseLayoutItem {
    inputType?: "text" | "password" | "number";
    required?: boolean;
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
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface IInputConfig extends IItem {
    type?: "input";
    inputType?: "text" | "password" | "number";
    value?: string | number;
    required?: boolean;
    validation?: Validation | ValidationInputFn;
    icon?: string;
    placeholder?: string;
    autocomplete?: boolean;
    readOnly?: boolean;
    maxlength?: number | string;
    minlength?: number | string;
    min?: number | string;
    max?: number | string;
}
export interface IInput {
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
export interface ITextProps extends IBaseLayoutItem {
    inputType?: "text" | "password" | "number";
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface ITextConfig extends IItem {
    type?: "text";
    value?: number | string;
    inputType?: "text" | "password" | "number";
}
export interface IText {
    config: ITextConfig;
    events: IEventSystem<ItemEvent, IInputEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setValue(value: string | number): void;
    getValue(): string | number;
    clear(): void;
    setProperties(propertyConfig: ITextProps): void;
    getProperties(): ITextProps;
}
export interface ITextAreaProps extends IBaseLayoutItem {
    required?: boolean;
    validation?: Validation | ValidationInputFn;
    placeholder?: string;
    readOnly?: boolean;
    maxlength?: number | string;
    minlength?: number | string;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface ITextAreaConfig extends IItem {
    type?: "textarea";
    required?: boolean;
    value?: string;
    validation?: Validation | ValidationFn;
    resizable?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    maxlength?: number | string;
    minlength?: number | string;
}
export interface ITextArea {
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
export interface IButtonConfig extends IBaseLayoutItem {
    id?: string;
    name?: string;
    type?: "button";
    submit?: boolean;
    url?: string;
    text?: string;
    icon?: string;
    view?: "flat" | "link";
    size?: "small" | "medium";
    color?: "danger" | "secondary" | "primary" | "success";
    full?: boolean;
    circle?: boolean;
    loading?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    value?: string;
}
export interface IButtonProps extends IBaseLayoutItem {
    submit?: boolean;
    url?: string;
    text?: string;
    icon?: string;
    view?: "flat" | "link";
    size?: "small" | "medium";
    color?: "danger" | "secondary" | "primary" | "success";
    full?: boolean;
    circle?: boolean;
    loading?: boolean;
}
export interface IButton {
    config: IButtonConfig;
    events: IEventSystem<ItemEvent, IButtonHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setProperties(propertyConfig: IButtonProps): void;
    getProperties(): IButtonProps;
    focus(): void;
    blur(): void;
}
export interface IComboProps extends IBaseLayoutItem {
    required?: boolean;
    validation?: ValidationComboFn;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    readOnly?: boolean;
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
export interface IComboConfig extends IItem, IComboboxConfig {
    type?: "combo";
    required?: boolean;
    value?: string | string[];
    data?: any[];
    validation?: ValidationComboFn;
}
export interface ICombo {
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
    validate(silent?: boolean, validateValue?: string | string[]): boolean;
    clearValidate(): void;
    setValue(value: string | string[]): void;
    getValue(): string | string[];
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Combobox;
    setProperties(propertyConfig: IComboProps): void;
    getProperties(): IComboProps;
}
export interface ISliderProps extends IBaseLayoutItem {
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    min?: number;
    max?: number;
    step?: number;
    mode?: Direction;
    range?: boolean;
    inverse?: boolean;
    tooltip?: boolean;
    tick?: number;
    tickTemplate?: (position: number) => string;
    majorTick?: number;
}
export interface ISliderFormConfig extends IItem, ISliderConfig {
    type?: "slider";
    value?: number | number[];
}
export interface ISliderForm {
    config: ISliderFormConfig;
    slider: Slider;
    events: IEventSystem<ItemEvent, ISliderFormEventHandlersMap>;
    destructor(): void;
    show(): void;
    focus(): void;
    blur(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setValue(value: number | number[]): void;
    getValue(): number[];
    clear(): void;
    getWidget(): Slider;
    setProperties(propertyConfig: ISliderProps): void;
    getProperties(): ISliderProps;
}
export interface IGroup extends IBaseLayoutItem {
    align?: FlexDirection;
    gravity?: boolean;
}
export interface IRadioButtonConfig {
    id?: string;
    type?: "radiobutton";
    checked?: boolean;
    value?: string;
    text?: string;
    $disabled?: boolean;
    $name?: string;
    $required?: boolean;
    $validationStatus?: ValidationStatus;
    $group?: boolean;
}
export interface IRadioGroupOption extends IGroup {
    rows?: IRadioButtonConfig[];
    cols?: IRadioButtonConfig[];
}
export interface IRadioGroupConfig extends IItem {
    type?: "radiogroup";
    required?: boolean;
    options: IRadioGroupOption;
    value?: string;
}
export interface IRadioGroup {
    config: IRadioGroupConfig;
    layout: Layout;
    events: IEventSystem<ItemEvent, IRadioGroupEventHandlersMap>;
    destructor(): void;
    getValue(): string;
    setValue(value: string): void;
    focus(id?: string): void;
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
    getProperties(id?: string): ICheckboxGroupProps | ICheckboxGroupItemProps;
    setProperties(arg?: string | ICheckboxGroupProps, props?: ICheckboxGroupItemProps): void;
}
export interface ICheckboxProps extends IBaseLayoutItem {
    required?: boolean;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    text?: string;
}
export interface ICheckboxConfig extends IItem {
    type?: "checkbox";
    required?: boolean;
    checked?: boolean;
    value?: string;
    text?: string;
    $group?: boolean;
    $required?: boolean;
}
export interface ICheckbox {
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
export interface ICheckboxGroupItemProps extends IBaseLayoutItem {
    id?: string;
    value?: string;
    text?: string;
}
export interface ICheckboxGroupProps extends IBaseLayoutItem {
    required?: boolean;
    options?: ICheckboxGroupOption;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface ICheckboxGroupItemConfig {
    id?: string;
    type?: "checkbox";
    checked?: boolean;
    value?: string;
    text?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    $validationStatus?: ValidationStatus;
    $group?: boolean;
}
export interface ICheckboxGroupValue {
    [id: string]: boolean | string;
}
export interface ICheckboxGroupOption extends IGroup {
    rows?: ICheckboxGroupItemConfig[];
    cols?: ICheckboxGroupItemConfig[];
}
export interface ICheckboxGroupConfig extends IItem {
    type?: "checkboxgroup";
    required?: boolean;
    options: ICheckboxGroupOption;
    value?: ICheckboxGroupValue;
}
export interface ICheckboxGroup {
    config: ICheckboxGroupConfig;
    events: IEventSystem<ItemEvent, ICheckboxGroupEventHandlersMap>;
    destructor(): void;
    getValue(): ICheckboxGroupValue;
    getValue(id: string): string | boolean;
    getValue(id?: string): ICheckboxGroupValue | string | boolean;
    setValue(value: ICheckboxGroupValue): void;
    focus(id?: string): void;
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
    isChecked(id?: string): boolean | {
        [key: string]: boolean;
    };
    getProperties(id?: string): ICheckboxGroupProps | ICheckboxGroupItemProps;
    setProperties(arg?: string | ICheckboxGroupProps, props?: ICheckboxGroupItemProps): void;
}
export interface ITimePickerProps extends IBaseLayoutItem {
    required?: boolean;
    validation?: ValidationFn;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    timeFormat?: 12 | 24;
    controls?: boolean;
    valueFormat?: "string" | "timeObject";
}
export interface ITimePickerConfig extends IItem, ITimepickerConfig {
    type?: "timepicker";
    required?: boolean;
    value?: Date | number | string | any[] | ITimeObject;
    validation?: ValidationTimepickerFn;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
}
export interface ITimePicker {
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
export interface IDatePickerProps extends IBaseLayoutItem {
    required?: boolean;
    validation?: ValidationDateInput;
    valueFormat?: IDatePickerValueFormat;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
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
export interface IDatePickerConfig extends IItem, ICalendarConfig {
    type?: "datepicker";
    required?: boolean;
    value?: Date | string;
    validation?: ValidationDateInput;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
    valueFormat?: IDatePickerValueFormat;
}
export interface IDatePicker {
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
export interface IColorpickerProps extends IBaseLayoutItem {
    required?: boolean;
    validation?: ValidationFn;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    mode?: ViewsMode;
    grayShades?: boolean;
    customColors?: string[];
    palette?: string[][];
}
export interface IColorPickerConfig extends IColorpickerConfig, IItem {
    type?: "colorpicker";
    required?: boolean;
    value?: string;
    validation?: ValidationFn;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
}
export interface IColorPicker {
    config: IColorPickerConfig;
    colorpicker: Colorpicker;
    events: IEventSystem<ItemEvent, IColorPickerEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string): boolean;
    clearValidate(): void;
    setValue(value: string): void;
    getValue(): string;
    focus(): void;
    blur(): void;
    clear(): void;
    getWidget(): Colorpicker;
    setProperties(propertyConfig: IColorpickerProps): void;
    getProperties(): IColorpickerProps;
}
export interface IOption {
    value: string | number;
    content: string;
    disabled?: boolean;
}
export interface ISelectProps extends IBaseLayoutItem {
    validation?: ValidationSelectFn;
    icon?: string;
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface ISelectConfig extends IItem {
    validation?: ValidationSelectFn;
    required?: boolean;
    type?: "select";
    options: IOption[];
    value?: string | number;
    icon?: string;
}
export interface ISelect {
    config: ISelectConfig;
    events: IEventSystem<ItemEvent, ISelectEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
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
export declare enum FileStatus {
    queue = "queue",
    uploaded = "uploaded",
    failed = "failed",
    inprogress = "inprogress"
}
export interface ISimpleVaultValue extends IFileWrapper {
    id: Id;
}
export interface IParams {
    [key: string]: any;
}
export interface ISimpleVaultProps extends IBaseLayoutItem {
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    required?: boolean;
    target?: string;
    singleRequest?: boolean;
    fieldName?: string;
    params?: IParams;
}
export interface ISimpleVaultConfig extends IItem {
    type?: "simplevault";
    required?: boolean;
    target?: string;
    singleRequest?: boolean;
    fieldName?: string;
    value?: ISimpleVaultValue[];
    params?: IParams;
    $vaultHeight?: number | string;
}
export interface IFileWrapper extends IDataItem {
    file: File;
    status: FileStatus;
    progress: number;
    link?: string;
    image?: HTMLImageElement;
    request?: XMLHttpRequest;
    path?: string;
    name?: string;
    size?: number;
    preview?: string;
    $toRemove?: boolean;
}
export declare enum UploaderEvents {
    uploadBegin = "uploadbegin",
    beforeUploadFile = "beforeuploadfile",
    uploadFile = "uploadfile",
    uploadFail = "uploadfail",
    uploadComplete = "uploadcomplete",
    uploadProgress = "uploadprogress"
}
export interface ISimpleVault {
    config: ISimpleVaultConfig;
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<UploaderEvents | ItemEvent | ISimpleVaultEventHandlersMap | any>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    clear(): void;
    getValue(): ISimpleVaultValue[];
    selectFile(): void;
    send(params?: IParams): void;
    setValue(value: ISimpleVaultValue[]): void;
    setProperties(propertyConfig: ISimpleVaultProps): void;
    getProperties(): ISimpleVaultProps;
}
export declare type ILabelPosition = "left" | "top";
export interface ILabel {
    helpMessage?: string;
    id?: string;
    labelPosition?: ILabelPosition;
    label?: string;
    labelWidth?: string | number;
    required?: boolean;
    type?: string;
}
export interface ISpacerConfig extends IBaseLayoutItem {
    type?: "spacer";
    name?: string;
    id?: string;
    hidden?: boolean;
}
export interface ISpacer {
    config: ISpacerConfig;
    events: IEventSystem<ItemEvent, ISpacerHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    setProperties(propertyConfig: IBaseLayoutItem): void;
    getProperties(): IBaseLayoutItem;
}
export interface IContainerConfig extends IBaseLayoutItem {
    type?: "container";
    name?: string;
    id?: string;
    hidden?: boolean;
    disabled?: boolean;
}
export interface IContainer {
    config: IContainerConfig;
    container: Layout;
    events: IEventSystem<ItemEvent, IContainerHandlersMap>;
    attach(widget: any): void;
    attachHTML(html: string): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setProperties(propertyConfig: IBaseLayoutItem): void;
    getProperties(): IBaseLayoutItem;
}
export declare type IItemConfig = IInputConfig | IButtonConfig | IComboConfig | ISliderFormConfig | ICheckboxConfig | IDatePickerConfig | ISelectConfig | ISimpleVaultConfig | ITextAreaConfig | ITimePickerConfig | ITextConfig | IColorPickerConfig | IRadioGroupConfig | ICheckboxGroupConfig | ISpacerConfig | IContainerConfig;
export declare type IBlock = IBlockConfig | IItemConfig[];
export declare enum ItemEvent {
    click = "click",
    change = "change",
    input = "input",
    focus = "focus",
    blur = "blur",
    keydown = "keydown",
    changeOptions = "changeOptions",
    beforeShow = "beforeShow",
    afterShow = "afterShow",
    beforeHide = "beforeHide",
    afterHide = "afterHide",
    beforeValidate = "beforeValidate",
    afterValidate = "afterValidate",
    beforeUploadFile = "beforeUploadFile",
    uploadFile = "uploadfile",
    uploadBegin = "uploadBegin",
    uploadComplete = "uploadComplete",
    uploadFail = "uploadFail",
    uploadProgress = "uploadProgress",
    beforeChangeProperties = "beforeChangeProperties",
    afterChangeProperties = "afterChangeProperties"
}
export interface IBaseHandlersMap {
    [key: string]: (...args: any[]) => any;
}
export interface IButtonHandlersMap extends IBaseHandlersMap {
    [ItemEvent.click]: (events: Event) => void;
    [ItemEvent.focus]: (text: string) => void;
    [ItemEvent.blur]: (text: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.beforeHide]: (text: string, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (text: string) => boolean | void;
    [ItemEvent.afterHide]: (text: string, init: boolean) => void;
    [ItemEvent.afterShow]: (text: string) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IButtonProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IButtonProps) => void;
}
export interface IColorPickerEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: string) => void;
    [ItemEvent.focus]: (value: string) => void;
    [ItemEvent.blur]: (value: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.input]: (inputValue: string) => void;
    [ItemEvent.beforeHide]: (value: string, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string) => boolean | void;
    [ItemEvent.afterHide]: (value: string, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string) => void;
    [ItemEvent.beforeValidate]: (value: string) => boolean | void;
    [ItemEvent.afterValidate]: (value: string, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IColorpickerProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IColorpickerProps) => void;
}
export interface IComboEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: string | string[]) => void;
    [ItemEvent.focus]: (value: string | string[]) => void;
    [ItemEvent.blur]: (value: string | string[]) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string | undefined) => void;
    [ItemEvent.beforeHide]: (value: string | string[], init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string | string[]) => boolean | void;
    [ItemEvent.afterHide]: (value: string | string[], init: boolean) => void;
    [ItemEvent.afterShow]: (value: string | string[]) => void;
    [ItemEvent.beforeValidate]: (value: string | string[]) => boolean | void;
    [ItemEvent.afterValidate]: (value: string | string[], isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IComboProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IComboProps) => void;
}
export interface IDatePickerEventHandlersMap extends IBaseHandlersMap {
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
export interface IRadioGroupEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: string) => void;
    [ItemEvent.focus]: (value: string, id: string) => void;
    [ItemEvent.blur]: (value: string, id: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string) => void;
    [ItemEvent.beforeHide]: (value: string, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: string) => boolean | void;
    [ItemEvent.afterHide]: (value: string, init: boolean) => void;
    [ItemEvent.afterShow]: (value: string) => void;
    [ItemEvent.beforeValidate]: (value: string) => boolean | void;
    [ItemEvent.afterValidate]: (value: string, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ICheckboxGroupProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ICheckboxGroupProps) => void;
}
export interface ICheckboxGroupEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: ICheckboxGroupValue) => void;
    [ItemEvent.focus]: (value: ICheckboxGroupValue, id: string) => void;
    [ItemEvent.blur]: (value: ICheckboxGroupValue, id: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string) => void;
    [ItemEvent.beforeHide]: (value: ICheckboxGroupValue, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: ICheckboxGroupValue) => boolean | void;
    [ItemEvent.afterHide]: (value: ICheckboxGroupValue, init: boolean) => void;
    [ItemEvent.afterShow]: (value: ICheckboxGroupValue) => void;
    [ItemEvent.beforeValidate]: (value: ICheckboxGroupValue) => boolean | void;
    [ItemEvent.afterValidate]: (value: ICheckboxGroupValue, isValidate: boolean) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ICheckboxGroupProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ICheckboxGroupProps) => void;
}
export interface ICheckboxEventHandlersMap extends IBaseHandlersMap {
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
export interface ISelectEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: string | number) => void;
    [ItemEvent.focus]: (value: string | number) => void;
    [ItemEvent.blur]: (value: string | number) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
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
export interface ISliderFormEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: number[]) => void;
    [ItemEvent.focus]: (value: number[]) => void;
    [ItemEvent.blur]: (value: number[]) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.beforeHide]: (value: number[], init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: number[]) => boolean | void;
    [ItemEvent.afterHide]: (value: number[], init: boolean) => void;
    [ItemEvent.afterShow]: (value: number[]) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ISliderProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ISliderProps) => void;
}
export interface ITimePickerEventHandlersMap extends IBaseHandlersMap {
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
export interface ISimpleVaultEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.change]: (value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeHide]: (value: ISimpleVaultValue[], init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.afterHide]: (value: ISimpleVaultValue[], init: boolean) => void;
    [ItemEvent.afterShow]: (value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeValidate]: (value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.afterValidate]: (value: ISimpleVaultValue[], isValidate: boolean) => void;
    [ItemEvent.beforeUploadFile]: (file: ISimpleVaultValue, value: ISimpleVaultValue[]) => boolean | void;
    [ItemEvent.uploadBegin]: (files: ISimpleVaultValue[], value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadComplete]: (files: ISimpleVaultValue[], value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadFail]: (file: ISimpleVaultValue, value: ISimpleVaultValue[]) => void;
    [ItemEvent.uploadFile]: (file: ISimpleVaultValue, value: ISimpleVaultValue[], extra?: {
        [key: string]: string;
    }) => void;
    [ItemEvent.uploadProgress]: (progress: number, value: ISimpleVaultValue[]) => void;
    [ItemEvent.beforeChangeProperties]: (properties: ISimpleVaultProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: ISimpleVaultProps) => void;
}
export interface ITextAreaEventHandlersMap extends IBaseHandlersMap {
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
    [ItemEvent.beforeChangeProperties]: (properties: IInputProps | ITextProps | ITextAreaProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IInputProps | ITextProps | ITextAreaProps) => void;
}
export interface IInputEventHandlersMap extends IBaseHandlersMap {
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
    [ItemEvent.beforeChangeProperties]: (properties: IInputProps | ITextProps | ITextAreaProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IInputProps | ITextProps | ITextAreaProps) => void;
}
export interface ISpacerHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeHide]: (value: undefined, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: undefined) => boolean | void;
    [ItemEvent.afterHide]: (value: undefined, init: boolean) => void;
    [ItemEvent.afterShow]: (value: undefined) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IBaseLayoutItem) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IBaseLayoutItem) => void;
}
export interface IContainerHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeHide]: (value: undefined, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: undefined) => boolean | void;
    [ItemEvent.afterHide]: (value: undefined, init: boolean) => void;
    [ItemEvent.afterShow]: (value: undefined) => void;
    [ItemEvent.beforeChangeProperties]: (properties: IBaseLayoutItem) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IBaseLayoutItem) => void;
}
export declare type FormDataCallback = (item: IFormConfig, index: number, array: any) => any;
export declare type ValidationFn = (input: string) => boolean;
export declare type ValidationInputFn = (input: string | number) => boolean;
export declare type ValidationDateInput = (input: string | Date) => boolean;
export declare type ValidationTimepickerFn = (input: string | ITimeObject) => boolean;
export declare type ValidationSelectFn = (input: string | number | boolean) => boolean;
export declare type ValidationComboFn = (input: string | string[]) => boolean;
export declare enum ClearMethod {
    value = "value",
    validation = "validation"
}
export declare enum Validation {
    empty = "",
    validEmail = "email",
    validInteger = "integer",
    validNumeric = "numeric",
    validAlphaNumeric = "alphanumeric",
    validIPv4 = "IPv4"
}
export declare enum ValidationStatus {
    pre = 0,
    error = 1,
    success = 2
}
