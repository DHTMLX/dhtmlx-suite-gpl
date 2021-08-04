import { Label } from "./helper/label";
import { IEventSystem } from "../../../ts-common/events";
import { IInputConfig, IInputEventHandlersMap, ItemEvent, IInput, IInputProps, ITextConfig, ITextAreaConfig } from "../types";
export declare class Input extends Label implements IInput {
    config: IInputConfig;
    events: IEventSystem<ItemEvent, IInputEventHandlersMap>;
    protected _propsItem: string[];
    protected _props: string[];
    private _isValid;
    constructor(container: HTMLElement | string, config?: {});
    destructor(): void;
    setProperties(propertyConfig: IInputProps): void;
    getProperties(): IInputProps;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    validate(silent?: boolean, validateValue?: string | number): boolean;
    clearValidate(): void;
    clear(): void;
    setValue(value: string | number): void;
    getValue(): string | number;
    focus(): void;
    blur(): void;
    protected _initView(config: IInputConfig | ITextConfig | ITextAreaConfig): void;
    protected _initHandlers(): void;
    protected _getHandlers(): {
        oninput: (e: Event) => void;
        onchange: (e: Event) => void;
        onfocus: () => void;
        onblur: () => void;
        onkeydown: (event: KeyboardEvent) => void;
    };
    protected _draw(): any;
}
