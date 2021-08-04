import { View } from "../../../ts-common/view";
import { IContainerHandlersMap, ItemEvent, IContainerConfig, IContainer, IBaseLayoutItem } from "../types";
import { IEventSystem } from "../../../ts-common/events";
import { Layout } from "../../../ts-layout";
export declare class Container extends View implements IContainer {
    config: IContainerConfig;
    container: Layout;
    events: IEventSystem<ItemEvent, IContainerHandlersMap>;
    constructor(container: any, config: IContainerConfig);
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
    protected _getRootView(): any;
    protected _draw(): any;
}
