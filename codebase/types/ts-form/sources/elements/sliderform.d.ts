import { Slider, Direction } from "../../../ts-slider";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ItemEvent, IBaseLayoutItem, ILabel, IBaseItem, IBaseState, ValidationStatus, IBaseHandlersMap } from "../types";
import { IFieldset } from "./fieldset";
export interface ISliderProps extends IBaseLayoutItem, ILabel {
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
export interface ISliderFormConfig extends IBaseItem, IBaseState, ISliderProps {
    type: "slider";
    value?: number | number[];
    $validationStatus?: ValidationStatus;
}
export interface ISliderForm {
    parent?: IFieldset;
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
export interface ISliderFormEventHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: number[]) => boolean | void;
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
export declare class SliderForm extends Label implements ISliderForm {
    parent: IFieldset;
    config: ISliderFormConfig;
    slider: Slider;
    events: IEventSystem<ItemEvent, ISliderFormEventHandlersMap>;
    private _propsItem;
    private _propsSlider;
    private _props;
    constructor(container: any, config: ISliderFormConfig);
    destructor(): void;
    setProperties(propertyConfig: ISliderProps): void;
    getProperties(): ISliderProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    clear(): void;
    getValue(): number[];
    setValue(value: number | number[]): void;
    getWidget(): Slider;
    focus(extra?: boolean): void;
    blur(): void;
    protected _initView(config: ISliderFormConfig): void;
    protected _initHandlers(): void;
    protected _drawSlider(): any;
}
