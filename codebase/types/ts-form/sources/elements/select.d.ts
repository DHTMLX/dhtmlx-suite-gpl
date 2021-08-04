import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import { ISelectConfig, ItemEvent, ISelectEventHandlersMap, IOption, ISelect, ISelectProps } from "../types";
export declare class Select extends Label implements ISelect {
    config: ISelectConfig;
    events: IEventSystem<ItemEvent, ISelectEventHandlersMap>;
    private _isValid;
    private _propsItem;
    private _props;
    constructor(container: any, config: ISelectConfig);
    destructor(): void;
    setProperties(propertyConfig: ISelectProps): void;
    getProperties(): ISelectProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean): boolean;
    clearValidate(): void;
    clear(): void;
    setValue(value: string | number): void;
    focus(): void;
    blur(): void;
    getValue(): string | number;
    setOptions(options: IOption[]): void;
    getOptions(): IOption[];
    protected _initView(config: ISelectConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        onchange: (e: Event) => void;
        onblur: () => void;
        onfocus: () => void;
    };
    protected _draw(): any;
    private _checkOptions;
}
