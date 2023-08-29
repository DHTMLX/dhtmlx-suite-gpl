import { Colorpicker, ViewsMode } from "../../../ts-colorpicker";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ItemEvent, IBaseHandlersMap, IBaseLayoutItem, ILabel, IMessage, ValidationFn, IBaseItem, IBaseState, ValidationStatus } from "../types";
import { IFieldset } from "./fieldset";
export interface IColorpickerProps extends IBaseLayoutItem, ILabel, IMessage {
    validation?: ValidationFn;
    icon?: string;
    placeholder?: string;
    editable?: boolean;
    mode?: ViewsMode;
    grayShades?: boolean;
    customColors?: string[];
    palette?: string[][];
    paletteOnly?: boolean;
    pickerOnly?: boolean;
}
export interface IColorPickerConfig extends IBaseItem, IBaseState, IColorpickerProps {
    type: "colorpicker";
    value?: string;
    $validationStatus?: ValidationStatus;
}
export interface IColorPicker {
    parent?: IFieldset;
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
export interface IColorPickerEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: string) => boolean | void;
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
export declare class ColorPicker extends Label implements IColorPicker {
    parent: IFieldset;
    config: IColorPickerConfig;
    colorpicker: Colorpicker;
    events: IEventSystem<ItemEvent, IColorPickerEventHandlersMap>;
    private _keyManager;
    private _popup;
    private _isValid;
    private _popupIsFocus;
    private _propsItem;
    private _propsColorpicker;
    private _props;
    constructor(container: any, config: IColorPickerConfig);
    destructor(): void;
    setProperties(propertyConfig: IColorpickerProps): void;
    getProperties(): IColorpickerProps;
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
    clear(): void;
    getWidget(): Colorpicker;
    focus(): void;
    blur(): void;
    protected _initView(config: IColorPickerConfig): void;
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
