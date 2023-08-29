import { IBaseLayoutItem, IBaseItem, IBaseState, IBaseHandlersMap, ItemEvent } from "../types";
import { View } from "../../../ts-common/view";
import { IFieldset } from "./fieldset";
import { IEventSystem } from "../../../ts-common/events";
export declare type IToggleValue = number | string;
export interface IToggleButtonProps extends IBaseLayoutItem {
    full?: boolean;
    text?: string;
    icon?: string;
    offText?: string;
    offIcon?: string;
    value?: IToggleValue;
}
export interface IToggleButtonConfig extends IBaseItem, IBaseState, IToggleButtonProps {
    type: "toggle";
    selected?: boolean;
    $group?: boolean;
    $gap?: number;
    $extraCss?: string;
}
export interface IToggleButton {
    parent?: IFieldset;
    config: IToggleButtonConfig;
    events: IEventSystem<ItemEvent, IToggleButtonHandlersMap>;
    setValue(selected: boolean, silent?: boolean): void;
    getValue(): IToggleValue | boolean;
    isSelected(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    focus(): void;
    blur(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setProperties(config: IToggleButtonProps): void;
    getProperties(): IToggleButtonProps;
    destructor(): void;
    paint(): void;
}
export interface IToggleButtonHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: IToggleValue | boolean) => boolean | void;
    [ItemEvent.change]: (value: IToggleValue | boolean) => void;
    [ItemEvent.focus]: (value: IToggleValue | boolean) => void;
    [ItemEvent.blur]: (value: IToggleValue | boolean) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent) => void;
    [ItemEvent.beforeHide]: (value: IToggleValue | boolean, init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: IToggleValue | boolean) => boolean | void;
    [ItemEvent.afterHide]: (value: IToggleValue | boolean, init: boolean) => void;
    [ItemEvent.afterShow]: (value: IToggleValue | boolean) => void;
    [ItemEvent.beforeChangeProperties]: (config: IToggleButtonProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (config: IToggleButtonProps) => void;
}
export declare class ToggleButton extends View implements IToggleButton {
    parent?: IFieldset;
    config: IToggleButtonConfig;
    events: IEventSystem<ItemEvent, IToggleButtonHandlersMap>;
    private props;
    private handlers;
    constructor(container: HTMLElement | string | null, config: IToggleButtonConfig);
    setValue(selected?: boolean, silent?: boolean): void;
    getValue(): IToggleValue | boolean;
    isSelected(): boolean;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    focus(): void;
    blur(): void;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setProperties(config: IToggleButtonProps): void;
    getProperties(): IToggleButtonProps;
    destructor(): void;
    protected draw(): any;
    private initHandlers;
}
