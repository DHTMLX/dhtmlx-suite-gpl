import { View } from "../../../ts-common/view";
import { ISpacerHandlersMap, ItemEvent, ISpacerConfig, ISpacer, IBaseLayoutItem } from "../types";
import { IEventSystem } from "../../../ts-common/events";
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
