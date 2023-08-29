import { View } from "../../../ts-common/view";
import { ItemEvent, IBaseLayoutItem, IBaseItem, IBaseState, IBaseHandlersMap } from "../types";
import { IEventSystem } from "../../../ts-common/events";
import { IFieldset } from "./fieldset";
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
export interface IButtonConfig extends IButtonProps, IBaseItem, IBaseState {
    type: "button";
    /** @deprecated See a documentation: https://docs.dhtmlx.com/ */
    value?: string;
}
export interface IButton {
    parent?: IFieldset;
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
export declare class Button extends View implements IButton {
    parent: IFieldset;
    config: IButtonConfig;
    events: IEventSystem<ItemEvent, IButtonHandlersMap>;
    private _handlers;
    private _propsItem;
    private _props;
    constructor(container: HTMLElement | string | null, config: any);
    destructor(): void;
    setProperties(propertyConfig: IButtonProps): void;
    getProperties(): IButtonProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    focus(): void;
    blur(): void;
    protected _draw(): any;
}
