import { View } from "../../../ts-common/view";
import { ItemEvent, IBaseLayoutItem, IBaseHandlersMap, IBaseItem } from "../types";
import { IEventSystem } from "../../../ts-common/events";
import { IFieldset } from "./fieldset";
export declare type ISpacerProps = IBaseLayoutItem;
export interface ISpacerConfig extends IBaseItem, ISpacerProps {
    type: "spacer";
    hidden?: boolean;
}
export interface ISpacer {
    parent?: IFieldset;
    config: ISpacerConfig;
    events: IEventSystem<ItemEvent, ISpacerHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    setProperties(propertyConfig: ISpacerProps): void;
    getProperties(): ISpacerProps;
}
export interface ISpacerHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeHide]: (init: boolean) => boolean | void;
    [ItemEvent.beforeShow]: () => boolean | void;
    [ItemEvent.afterHide]: (init: boolean) => void;
    [ItemEvent.afterShow]: () => void;
    [ItemEvent.beforeChangeProperties]: (properties: IBaseLayoutItem) => boolean | void;
    [ItemEvent.afterChangeProperties]: (properties: IBaseLayoutItem) => void;
}
export declare class Spacer extends View implements ISpacer {
    config: ISpacerConfig;
    events: IEventSystem<ItemEvent, ISpacerHandlersMap>;
    constructor(container: HTMLElement | string, config: any);
    destructor(): void;
    setProperties(propertyConfig: IBaseLayoutItem): void;
    getProperties(): IBaseLayoutItem;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    protected _draw(): any;
}
