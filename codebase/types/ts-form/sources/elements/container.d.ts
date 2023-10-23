import { Label } from "./helper/label";
import { ItemEvent, IBaseLayoutItem, IBaseItem, IBaseState, IBaseHandlersMap, ILabel } from "../types";
import { IEventSystem } from "../../../ts-common/events";
import { Layout } from "../../../ts-layout";
import { IFieldset } from "./fieldset";
export type IContainerProps = IBaseLayoutItem & Omit<ILabel, "required">;
export interface IContainerConfig extends IContainerProps, IBaseItem, IBaseState {
    type: "container";
}
export interface IContainer {
    parent?: IFieldset;
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
    setProperties(propertyConfig: IContainerProps): void;
    getProperties(): IContainerProps;
}
export interface IContainerHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeHide]: (init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: () => boolean | void;
    [ItemEvent.afterHide]: (init: boolean) => void;
    [ItemEvent.afterShow]: () => void;
    [ItemEvent.beforeChangeProperties]: (properties: IContainerProps) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IContainerProps) => void;
}
export declare class Container extends Label implements IContainer {
    parent: IFieldset;
    config: IContainerConfig;
    container: Layout;
    events: IEventSystem<ItemEvent, IContainerHandlersMap>;
    private _props;
    constructor(container: any, config: IContainerConfig);
    attach(widget: any): void;
    attachHTML(html: string): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setProperties(propertyConfig: IContainerProps): void;
    getProperties(): IContainerProps;
    protected _getRootView(): any;
    protected _draw(): any;
}
