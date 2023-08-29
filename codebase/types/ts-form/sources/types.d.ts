import { IEventSystem } from "../../ts-common/events";
import { Layout } from "../../ts-layout";
import { IAnyObj } from "../../ts-common/types";
import { FlexDirection } from "../../ts-common/html";
import { IAvatarConfig, IAvatar, IAvatarProps } from "./elements/avatar";
import { IButtonConfig, IButton, IButtonProps } from "./elements/button";
import { ICheckboxConfig, ICheckbox, ICheckboxProps } from "./elements/checkbox";
import { ICheckboxGroupConfig, ICheckboxGroup, ICheckboxGroupProps } from "./elements/checkboxGroup";
import { IColorPickerConfig, IColorPicker, IColorpickerProps } from "./elements/colorpicker";
import { IComboConfig, ICombo, IComboProps } from "./elements/combo";
import { IContainerConfig, IContainer, IContainerProps } from "./elements/container";
import { IDatePickerConfig, IDatePicker, IDatePickerProps } from "./elements/dateinput";
import { IFieldsetConfig, IFieldset, IFieldsetProps } from "./elements/fieldset";
import { IInputConfig, IInput, IInputProps } from "./elements/input";
import { IRadioGroupConfig, IRadioGroup, IRadioButtonProps, IRadioGroupProps } from "./elements/radioGroup";
import { ISelectConfig, ISelect, ISelectProps } from "./elements/select";
import { ISimpleVaultConfig, ISimpleVault, ISimpleVaultProps } from "./elements/simplevault";
import { ISliderFormConfig, ISliderForm, ISliderProps } from "./elements/sliderform";
import { ISpacerConfig, ISpacer, ISpacerProps } from "./elements/spacer";
import { ITextAreaConfig, ITextArea, ITextAreaProps } from "./elements/textarea";
import { ITextConfig, IText, ITextProps } from "./elements/textinput";
import { ITimePickerConfig, ITimePicker, ITimePickerProps } from "./elements/timeinput";
import { IToggleButtonConfig, IToggleButton, IToggleButtonProps } from "./elements/ToggleButton";
import { IToggleGroupProps, IToggleGroupConfig, IToggleGroup } from "./elements/ToggleGroup";
export declare type TFormDataCallback = (item: IItem, index: number, array: IItem[]) => void;
export declare enum ClearMethod {
    value = "value",
    validation = "validation"
}
export interface IFormConfig extends IBlockConfig, IBaseState {
}
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
    forEach(callback: TFormDataCallback): void;
    getProperties(name?: string): {
        [name: string]: TProps;
    } | TProps;
    setProperties(arg: string | {
        [name: string]: TProps;
    }, props?: TProps): void;
}
export declare enum FormEvents {
    beforeChange = "beforeChange",
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
    [FormEvents.beforeChange]: (name: string, value: any) => boolean | void;
    [FormEvents.change]: (name: string, value: any) => void;
    [FormEvents.click]: (name: string, event: Event) => void;
    [FormEvents.focus]: (name: string, value: any, id?: string) => void;
    [FormEvents.blur]: (name: string, value: any, id?: string) => void;
    [FormEvents.keydown]: (event: KeyboardEvent, name: string, id?: string) => void;
    [FormEvents.beforeHide]: (name: string, value?: any, id?: string) => boolean | void;
    [FormEvents.afterHide]: (name: string, value?: any, id?: string) => void;
    [FormEvents.beforeShow]: (name: string, value?: any, id?: string) => boolean | void;
    [FormEvents.afterShow]: (name: string, value?: any, id?: string) => void;
    [FormEvents.beforeValidate]: (name: string, value: any) => boolean | void;
    [FormEvents.afterValidate]: (name: string, value: any, isValid: boolean) => void;
    [FormEvents.beforeChangeProperties]: (name: string, props: any) => boolean | void;
    [FormEvents.afterChangeProperties]: (name: string, props: any) => void;
    [FormEvents.beforeSend]: () => boolean;
    [FormEvents.afterSend]: () => void;
    [FormEvents.buttonClick]: (name: string, event: Event) => any;
    [FormEvents.validationFail]: (id: string, component: any) => any;
}
export declare type ValidationFn = (input: string) => boolean;
export declare enum ValidationStatus {
    pre = 0,
    error = 1,
    success = 2
}
export declare type TItemType = "input" | "button" | "avatar" | "combo" | "slider" | "radiobutton" | "radiogroup" | "checkbox" | "checkboxgroup" | "select" | "simplevault" | "textarea" | "timepicker" | "datepicker" | "colorpicker" | "text" | "spacer" | "container" | "fieldset" | "toggle" | "togglegroup";
export interface IBlockConfig extends IBaseLayoutItem {
    rows?: IBlock & any;
    cols?: IBlock & any;
    align?: FlexDirection;
    title?: string;
}
export interface IBaseItem {
    type: TItemType;
    name?: string;
    id?: string;
}
export interface IBaseLayoutItem {
    css?: string;
    width?: string | number | "content";
    height?: string | number | "content";
    padding?: string | number;
}
export declare type ILabelPosition = "left" | "top";
export interface ILabel {
    label?: string;
    labelWidth?: string | number;
    labelPosition?: ILabelPosition;
    hiddenLabel?: boolean;
    helpMessage?: string;
    required?: boolean;
}
export interface IMessage {
    preMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}
export interface IBaseState {
    hidden?: boolean;
    disabled?: boolean;
}
export interface IBaseHandlersMap {
    [key: string]: (...args: any[]) => any;
}
export interface IGroup extends IBaseLayoutItem {
    align?: FlexDirection;
}
export declare type TProps = IButtonProps | IAvatarProps | ICheckboxProps | ICheckboxGroupProps | IColorpickerProps | IComboProps | IContainerProps | IDatePickerProps | IInputProps | IRadioButtonProps | IRadioGroupProps | ISelectProps | ISimpleVaultProps | ISliderProps | ITextProps | ITextAreaProps | ITimePickerProps | ISpacerProps | IFieldsetProps | IToggleButtonProps | IToggleGroupProps;
export declare type IItemConfig = IAvatarConfig | IInputConfig | IButtonConfig | IComboConfig | ISliderFormConfig | ICheckboxConfig | IDatePickerConfig | ISelectConfig | ISimpleVaultConfig | ITextAreaConfig | ITimePickerConfig | ITextConfig | IColorPickerConfig | IRadioGroupConfig | ICheckboxGroupConfig | ISpacerConfig | IContainerConfig | IFieldsetConfig | IToggleButtonConfig | IToggleGroupConfig;
export declare type IItem = IAvatar | IInput | IButton | ICombo | ISliderForm | ICheckbox | IDatePicker | ISelect | ISimpleVault | ITextArea | ITimePicker | IText | IColorPicker | IRadioGroup | ICheckboxGroup | ISpacer | IContainer | IFieldset | IToggleButton | IToggleGroup;
export declare type IBlock = IBlockConfig | IItemConfig[];
export declare enum ItemEvent {
    click = "click",
    beforeChange = "beforeChange",
    change = "change",
    input = "input",
    focus = "focus",
    blur = "blur",
    keydown = "keydown",
    beforeChangeOptions = "beforeChangeOptions",
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
