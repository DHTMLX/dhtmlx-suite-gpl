import { Input, IInputEventHandlersMap } from "./input";
import { ItemEvent, IBaseLayoutItem, ILabel, IMessage, IBaseItem, IBaseState } from "../types";
import { IFieldset } from "./fieldset";
import { IEventSystem } from "../../../ts-common/events";
export interface ITextProps extends IBaseLayoutItem, ILabel, IMessage {
    inputType?: "text" | "password" | "number";
}
export interface ITextConfig extends IBaseItem, IBaseState, ITextProps {
    type: "text";
    value?: number | string;
}
export interface IText {
    parent?: IFieldset;
    config: ITextConfig;
    events: IEventSystem<ItemEvent, IInputEventHandlersMap>;
    destructor(): void;
    show(): void;
    hide(init?: boolean): void;
    isVisible(): boolean;
    disable(): void;
    enable(): void;
    isDisabled(): boolean;
    setValue(value: string | number): void;
    getValue(): string | number;
    clear(): void;
    setProperties(propertyConfig: ITextProps): void;
    getProperties(): ITextProps;
}
export declare class Text extends Input implements IText {
    config: ITextConfig & {
        type: any;
    };
    protected _propsItem: string[];
    protected _props: string[];
    setProperties(propertyConfig: ITextProps): void;
    getProperties(): ITextProps;
    protected _initView(config: ITextConfig): void;
    protected _draw(): any;
}
