import { Layout } from "../../../ts-layout";
import { IEventSystem } from "../../../ts-common/events";
import { Label } from "./helper/label";
import { ItemEvent, ICheckboxGroupEventHandlersMap, ICheckboxGroup, ICheckboxGroupConfig, ICheckboxGroupValue, ICheckboxGroupProps, ICheckboxGroupItemProps } from "../types";
export declare class CheckboxGroup extends Label implements ICheckboxGroup {
    config: ICheckboxGroupConfig;
    layout: Layout;
    events: IEventSystem<ItemEvent, ICheckboxGroupEventHandlersMap>;
    private _buttons;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: any, config: ICheckboxGroupConfig);
    destructor(): void;
    setProperties(arg?: string | ICheckboxGroupProps, props?: ICheckboxGroupItemProps): void;
    getProperties(id?: string): ICheckboxGroupProps | ICheckboxGroupItemProps;
    getValue(): ICheckboxGroupValue;
    getValue(id: string): string | boolean;
    setValue(newValue: ICheckboxGroupValue): void;
    isChecked(id?: string): boolean | {
        [key: string]: boolean;
    };
    focus(id?: string): void;
    blur(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    clear(): void;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    protected _initView(config: ICheckboxGroupConfig): void;
    protected _initHandlers(): void;
    protected _draw(): any;
}
