import { View } from "../../../ts-common/view";
import { IButtonConfig, IButtonHandlersMap, IButtonProps, ItemEvent } from "../types";
import { IEventSystem } from "../../../ts-common/events";
export declare class Button extends View {
    config: IButtonConfig;
    events: IEventSystem<ItemEvent, IButtonHandlersMap>;
    private _handlers;
    private _propsItem;
    private _props;
    constructor(container: HTMLElement | string, config: any);
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
