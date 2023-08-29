import { IBaseItem, IBaseState, IBaseLayoutItem, IBaseHandlersMap, ItemEvent } from "../types";
import { IToggleButtonConfig, IToggleValue, IToggleButtonProps } from "./ToggleButton";
import { View } from "../../../ts-common/view";
import { IFieldset } from "./fieldset";
import { IEventSystem } from "../../../ts-common/events";
export interface IToggleGroupValue {
    [id: string]: IToggleValue | boolean;
}
export interface IToggleGroupProps extends IBaseLayoutItem {
    options?: IToggleButtonConfig[];
    full?: boolean;
    gap?: number;
    multiselection?: boolean;
}
export interface IToggleGroupConfig extends IBaseItem, IBaseState, IToggleGroupProps {
    type: "togglegroup";
    options: IToggleButtonConfig[];
    value?: IToggleGroupValue;
}
export interface IToggleGroup {
    parent?: IFieldset;
    config: IToggleGroupConfig;
    events: IEventSystem<ItemEvent, IToggleGroupHandlersMap>;
    setValue(value: IToggleGroupValue): void | boolean;
    getValue(): IToggleGroupValue;
    getValue(id: string): IToggleValue | boolean;
    getValue(id?: string): IToggleGroupValue | IToggleValue | boolean;
    isSelected(): {
        [id: string]: boolean;
    };
    isSelected(id: string): boolean;
    isSelected(id?: string): boolean | {
        [id: string]: boolean;
    };
    show(id?: string): void;
    hide(id?: string, init?: boolean): void;
    isVisible(id?: string): boolean;
    focus(id?: string): void;
    blur(): void;
    disable(id?: string): void;
    enable(id?: string): void;
    isDisabled(id?: string): boolean;
    setProperties(config: IToggleGroupProps): void;
    setProperties(config: IToggleButtonProps, id: string): void;
    setProperties(config: IToggleGroupProps | IToggleButtonProps, id?: string): void;
    getProperties(): IToggleGroupProps;
    getProperties(id: string): IToggleButtonProps;
    getProperties(id?: string): IToggleGroupProps | IToggleButtonProps;
    destructor(): void;
}
export interface IToggleGroupHandlersMap extends IBaseHandlersMap {
    [ItemEvent.beforeChange]: (value: IToggleGroupValue) => boolean | void;
    [ItemEvent.change]: (value: IToggleGroupValue) => void;
    [ItemEvent.focus]: (value: IToggleGroupValue, id: string) => void;
    [ItemEvent.blur]: (value: IToggleGroupValue, id: string) => void;
    [ItemEvent.keydown]: (event: KeyboardEvent, id: string) => void;
    [ItemEvent.beforeHide]: (value: IToggleGroupValue, id?: string, init?: boolean) => boolean | void;
    [ItemEvent.beforeShow]: (value: IToggleGroupValue, id?: string) => boolean | void;
    [ItemEvent.afterHide]: (value: IToggleGroupValue, id?: string, init?: boolean) => void;
    [ItemEvent.afterShow]: (value: IToggleGroupValue, id?: string) => void;
    [ItemEvent.beforeChangeProperties]: (config: IToggleGroupProps | IToggleButtonProps, id?: string) => boolean | void;
    [ItemEvent.afterChangeProperties]: (config: IToggleGroupProps | IToggleButtonProps, id?: string) => void;
}
export declare class ToggleGroup extends View implements IToggleGroup {
    parent?: IFieldset;
    config: IToggleGroupConfig;
    events: IEventSystem<ItemEvent, IToggleGroupHandlersMap>;
    private items;
    private props;
    constructor(container: HTMLElement | string | null, config: IToggleGroupConfig);
    setValue(value: IToggleGroupValue): void | boolean;
    getValue(): IToggleGroupValue;
    getValue(id: string): IToggleValue | boolean;
    isSelected(): {
        [id: string]: boolean;
    };
    isSelected(id: string): boolean;
    show(id?: string): void;
    hide(id?: string, init?: boolean): void;
    isVisible(id?: string): boolean;
    focus(id?: string): void;
    blur(): void;
    disable(id?: string): void;
    enable(id?: string): void;
    isDisabled(id?: string): boolean;
    setProperties(config: IToggleGroupProps): void;
    setProperties(config: IToggleButtonProps, id: string): void;
    getProperties(): IToggleGroupProps;
    getProperties(id: string): IToggleButtonProps;
    destructor(): void;
    private initView;
    private initHandlers;
    private draw;
    private checkVisibleOrder;
}
